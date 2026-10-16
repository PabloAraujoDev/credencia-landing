import { expect, test, type Page } from '@playwright/test'

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 640

async function fillValidForm(page: Page) {
  const form = page.locator('#demonstracao form')
  await form.getByLabel('Nome').fill('Marina Duarte')
  await form.getByLabel('Empresa').fill('Duarte Formaturas')
  await form.getByLabel('E-mail').fill('marina@duarte.com.br')
  await form.getByLabel('WhatsApp').pressSequentially('11987654321')
  await form.getByLabel('Formaturas por ano').selectOption('6 a 15')
  await form.getByRole('checkbox').check()
  return form
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('navegação: âncoras do menu levam às seções', async ({ page }) => {
  if (isMobile(page)) {
    const toggle = page.getByRole('button', { name: 'Abrir menu' })
    await toggle.click()
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true')
    await page.locator('#menu-movel').getByRole('link', { name: 'Segurança' }).click()
    await expect(page.locator('#menu-movel')).toBeHidden()
  } else {
    await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Segurança' }).click()
  }
  await expect(page).toHaveURL(/#seguranca$/)
  await expect(page.getByRole('heading', { name: 'Desenvolvido com foco em proteção de dados.' })).toBeInViewport()
})

test('menu móvel fecha com Esc e devolve o foco', async ({ page }) => {
  test.skip(!isMobile(page), 'só no celular')
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await page.keyboard.press('Escape')
  await expect(page.locator('#menu-movel')).toBeHidden()
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused()
})

test('todos os botões de ação apontam para destinos que existem', async ({ page }) => {
  const hrefs = await page.locator('a[href^="#"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')!))])
  for (const href of hrefs) {
    expect(await page.locator(href).count(), `destino ${href}`).toBe(1)
  }
  const hero = page.locator('#topo')
  await hero.getByRole('link', { name: 'Peça uma demonstração' }).click()
  await expect(page.locator('#demonstracao form')).toBeInViewport()
})

test('abas "Para quem usa": clique e setas do teclado', async ({ page }) => {
  const tabs = page.getByRole('tablist', { name: 'Perfis de uso' })
  await tabs.getByRole('tab', { name: 'Formando' }).click()
  await expect(page.locator('#painel-formando')).toBeVisible()
  await expect(page.locator('#painel-empresa')).toBeHidden()
  await page.keyboard.press('ArrowRight')
  await expect(tabs.getByRole('tab', { name: 'Portaria' })).toBeFocused()
  await expect(tabs.getByRole('tab', { name: 'Portaria' })).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('Home')
  await expect(tabs.getByRole('tab', { name: 'Empresa' })).toHaveAttribute('aria-selected', 'true')
})

test('simulador da portaria: 1ª leitura autoriza, 2ª do mesmo convite é negada', async ({ page }) => {
  await page.getByRole('tab', { name: 'Portaria' }).click()
  const panel = page.locator('#painel-portaria')
  await panel.getByRole('button', { name: 'Ler o QR Code do convite' }).click()
  await expect(panel.getByRole('status')).toContainText('Autorizado')
  await expect(panel.getByText('1 entrada', { exact: true }).first()).toBeVisible()

  await panel.getByRole('button', { name: 'Voltar para a câmera' }).click()
  await panel.getByRole('button', { name: 'Ler o mesmo convite de novo' }).click()
  await expect(panel.getByRole('status')).toContainText('Negado. Convite já utilizado')
  await expect(panel.locator('li', { hasText: 'NEGADO' })).toHaveCount(1)

  await panel.getByRole('button', { name: 'Reiniciar' }).click()
  await expect(panel.getByText('Nenhuma leitura ainda.')).toBeVisible()
})

test('sua marca: trocar a marca aplica a nova identidade', async ({ page }) => {
  const lume = page.getByRole('button', { name: 'Lume Eventos' })
  await lume.click()
  await expect(lume).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('img', { name: 'Painel da empresa com a marca Lume Eventos.' })).toBeVisible()
  const sidebarColor = await page.locator('section[aria-labelledby="marca-title"] .mk-side').evaluate((el) => getComputedStyle(el).getPropertyValue('--brand').trim())
  expect(sidebarColor).toBe('#0f6b63')
})

test('formulário: validação aponta cada campo e foca o primeiro inválido', async ({ page }) => {
  const form = page.locator('#demonstracao form')
  await form.getByRole('button', { name: 'Pedir demonstração' }).click()
  await expect(form.getByLabel('Nome')).toBeFocused()
  await expect(form.getByLabel('Nome')).toHaveAttribute('aria-invalid', 'true')
  await expect(form.getByText('Informe seu nome.')).toBeVisible()
  await expect(form.getByText('Informe um e-mail válido', { exact: false })).toBeVisible()
  await expect(form.getByText('Precisamos do seu consentimento', { exact: false })).toBeVisible()

  await form.getByLabel('E-mail').fill('email-invalido')
  await form.getByLabel('WhatsApp').pressSequentially('1199')
  await form.getByRole('button', { name: 'Pedir demonstração' }).click()
  await expect(form.getByText('Informe um e-mail válido', { exact: false })).toBeVisible()
  await expect(form.getByText('Informe o WhatsApp com DDD', { exact: false })).toBeVisible()
})

test('formulário: máscara do WhatsApp', async ({ page }) => {
  const field = page.locator('#demonstracao form').getByLabel('WhatsApp')
  await field.pressSequentially('11987654321')
  await expect(field).toHaveValue('(11) 98765-4321')
})

test('formulário: carregamento e sucesso enviam o JSON certo', async ({ page }) => {
  let body: Record<string, unknown> | null = null
  // A resposta só sai depois de conferirmos o estado de carregamento (sem depender de tempo)
  let release!: () => void
  const held = new Promise<void>((r) => (release = r))
  await page.route('**/api/lead', async (route) => {
    body = route.request().postDataJSON()
    await held
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  const form = await fillValidForm(page)
  await form.getByRole('button', { name: 'Pedir demonstração' }).click()
  await expect(page.getByRole('button', { name: 'Enviando…' })).toBeDisabled()
  release()
  await expect(page.getByRole('heading', { name: 'Pedido recebido, Marina.' })).toBeFocused()
  expect(body).toMatchObject({ nome: 'Marina Duarte', empresa: 'Duarte Formaturas', email: 'marina@duarte.com.br', whatsapp: '11987654321', volume: '6 a 15', consentimento: true })
})

test('formulário: erro do servidor mantém os dados e permite tentar de novo', async ({ page }) => {
  let calls = 0
  await page.route('**/api/lead', (route) => {
    calls++
    return calls === 1 ? route.fulfill({ status: 500, body: 'erro' }) : route.fulfill({ status: 200, body: '{}' })
  })
  const form = await fillValidForm(page)
  await form.getByRole('button', { name: 'Pedir demonstração' }).click()
  await expect(form.getByRole('alert')).toContainText('Não conseguimos enviar seu pedido agora')
  await expect(form.getByLabel('Nome')).toHaveValue('Marina Duarte')
  await form.getByRole('button', { name: 'Tentar de novo' }).click()
  await expect(page.getByRole('heading', { name: 'Pedido recebido, Marina.' })).toBeVisible()
  expect(calls).toBe(2)
})

test('barra de ação móvel: aparece após o hero e some no formulário', async ({ page }) => {
  test.skip(!isMobile(page), 'só no celular')
  const bar = page.locator('div.fixed.bottom-0')
  await expect(bar).toHaveAttribute('aria-hidden', 'true')
  await page.locator('#como-funciona').scrollIntoViewIfNeeded()
  await expect(bar).toHaveAttribute('aria-hidden', 'false')
  await page.locator('#demonstracao form').scrollIntoViewIfNeeded()
  await expect(bar).toHaveAttribute('aria-hidden', 'true')
})

test('movimento reduzido: conteúdo visível sem animação', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', baseURL: 'http://localhost:5174' })
  const page = await context.newPage()
  await page.goto('/')
  const opacity = await page.locator('#recursos [data-reveal]').first().evaluate((el) => getComputedStyle(el).opacity)
  expect(opacity).toBe('1')
  const anim = await page.locator('.pipeline-pulse').first().evaluate((el) => getComputedStyle(el).animationName)
  expect(anim).toBe('none')
  await context.close()
})

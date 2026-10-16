import { expect, test } from '@playwright/test'

test('formulário no modo WhatsApp abre a conversa com o pedido escrito', async ({ page, context }) => {
  // Não sai para a internet: o wa.me é respondido localmente
  await context.route('https://wa.me/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>wa</title>' }))
  await page.goto('/')

  const form = page.locator('#demonstracao form')
  await form.getByLabel('Nome').fill('Marina Duarte')
  await form.getByLabel('Empresa').fill('Duarte Formaturas')
  await form.getByLabel('E-mail').fill('marina@duarte.com.br')
  await form.getByLabel('WhatsApp').pressSequentially('11987654321')
  await form.getByLabel('Formaturas por ano').selectOption('16 a 30')
  await form.getByRole('checkbox').check()

  const popupPromise = page.waitForEvent('popup')
  await form.getByRole('button', { name: 'Pedir demonstração' }).click()
  const popup = await popupPromise

  const url = new URL(popup.url())
  expect(url.origin + url.pathname).toBe('https://wa.me/5511900000000')
  const text = url.searchParams.get('text') ?? ''
  expect(text).toContain('Olá! Quero uma demonstração do Credencia.')
  expect(text).toContain('Nome: Marina Duarte')
  expect(text).toContain('Empresa: Duarte Formaturas')
  expect(text).toContain('E-mail: marina@duarte.com.br')
  expect(text).toContain('WhatsApp: (11) 98765-4321')
  expect(text).toContain('Formaturas por ano: 16 a 30')

  // Confirmação honesta: o pedido só chega quando a pessoa envia a mensagem
  await expect(page.getByRole('heading', { name: 'Falta só enviar, Marina.' })).toBeFocused()
  const fallback = page.getByRole('link', { name: 'O WhatsApp não abriu? Abrir agora' })
  await expect(fallback).toHaveAttribute('href', popup.url())
  await page.getByRole('button', { name: 'Corrigir meus dados' }).click()
  await expect(form.getByLabel('Nome')).toHaveValue('Marina Duarte')
})

test('modo WhatsApp não abre nada se o formulário for inválido', async ({ page, context }) => {
  let opened = false
  context.on('page', () => (opened = true))
  await page.goto('/')
  await page.locator('#demonstracao form').getByRole('button', { name: 'Pedir demonstração' }).click()
  await expect(page.getByText('Informe seu nome.')).toBeVisible()
  expect(opened).toBe(false)
})

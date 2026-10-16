import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('HTML pré-renderizado e SEO', async ({ request }) => {
  const res = await request.get('/')
  expect(res.ok()).toBeTruthy()
  const html = await res.text()
  // conteúdo já vem no HTML, sem depender de JS
  expect(html).toContain('Da lista de convidados')
  expect(html).toContain('O formando precisa baixar um aplicativo?')
  expect(html).toMatch(/<html lang="pt-BR"/)
  expect(html).toMatch(/<meta\s+name="description"/)
  expect(html).toContain('"@type":"FAQPage"')
  expect(html).toContain('"@type":"SoftwareApplication"')
  expect(html).not.toContain('aggregateRating')
  expect(html).toMatch(/rel="preload" href="\/assets\/archivo-latin-wdth/)
})

test('carrega sem erros de console nem falhas de rede', async ({ page }) => {
  const problems: string[] = []
  page.on('console', (m) => m.type() === 'error' && problems.push(m.text()))
  page.on('pageerror', (e) => problems.push(e.message))
  page.on('response', (r) => r.status() >= 400 && problems.push(`${r.status()} ${r.url()}`))
  await page.goto('/', { waitUntil: 'networkidle' })
  // rola tudo para disparar observers e hidratação completa
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
  })
  expect(problems).toEqual([])
})

test('sem rolagem horizontal', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})

test('hierarquia de títulos: um h1, seções com h2', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveCount(1)
  expect(await page.locator('h2').count()).toBeGreaterThanOrEqual(8)
})

test('links internos e páginas existem', async ({ page, request }) => {
  await page.goto('/')
  const paths = await page.locator('a[href^="/"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')!))])
  for (const p of [...paths, '/favicon.svg', '/og-image.png', '/robots.txt']) {
    const res = await request.get(p)
    expect(res.status(), p).toBe(200)
  }
})

test('acessibilidade (axe, WCAG 2.2 AA) sem violações', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
  })
  await page.waitForTimeout(900)
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
  const summary = results.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)
  expect(summary).toEqual([])
})

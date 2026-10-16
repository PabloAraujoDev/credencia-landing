/**
 * Gera public/og-image.png (1200×630, a partir do hero real) e
 * public/apple-touch-icon.png (180×180, a partir do favicon).
 * Uso: com `npm run preview` rodando na porta 4173 → `node scripts/generate-images.mjs`
 */
import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = path.join(root, 'public')
const url = process.env.PREVIEW_URL || 'http://localhost:4173/'

const browser = await chromium.launch({ channel: 'msedge' })

// Imagem de compartilhamento: o hero em 1200×630, sem a barra fixa
const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
await og.goto(url, { waitUntil: 'networkidle' })
await og.addStyleTag({
  content: `header{display:none!important} #topo .pt-32,#topo [class*="pt-"]{padding-top:56px!important}
            #topo h1{font-size:76px!important} #topo .mt-16{margin-top:36px!important}`,
})
await og.waitForTimeout(300)
await og.screenshot({ path: path.join(pub, 'og-image.png') })

// Ícone para iOS
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } })
const svg = await readFile(path.join(pub, 'favicon.svg'), 'utf8')
await icon.setContent(`<style>html,body{margin:0;background:#0c0612}svg{width:180px;height:180px;display:block}</style>${svg.replace('rx="9"', 'rx="0"')}`)
await icon.screenshot({ path: path.join(pub, 'apple-touch-icon.png') })

await browser.close()
console.log('✓ og-image.png e apple-touch-icon.png gerados em public/')

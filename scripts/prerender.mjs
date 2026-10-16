/**
 * Pré-renderização: injeta o HTML do React em dist/index.html para que
 * buscadores e a primeira pintura recebam a página completa, sem esperar JS.
 * Também gera JSON-LD, sitemap, robots e (se configurado) Plausible e URLs absolutas.
 */
import { readFile, writeFile, readdir, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import { loadEnv } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const env = { ...loadEnv('production', root, ''), ...process.env }
const siteUrl = (env.SITE_URL || '').replace(/\/+$/, '')
const plausibleDomain = env.VITE_PLAUSIBLE_DOMAIN || ''
const base = env.BASE_PATH || '/'

const { render, faqs, site } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const appHtml = render()

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'pt-BR',
    description: site.description,
    ...(siteUrl && { url: siteUrl }),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
]

// Pré-carrega a fonte de títulos (maior impacto no LCP)
const assets = await readdir(path.join(dist, 'assets'))
const archivo = assets.find((f) => f.startsWith('archivo-latin-wdth') && f.endsWith('.woff2'))

const headExtra = [
  archivo && `<link rel="preload" href="${base}assets/${archivo}" as="font" type="font/woff2" crossorigin />`,
  siteUrl && `<link rel="canonical" href="${siteUrl}/" />`,
  siteUrl && `<meta property="og:url" content="${siteUrl}/" />`,
  plausibleDomain && `<script defer data-domain="${plausibleDomain}" src="https://plausible.io/js/script.js"></script>`,
  `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
]
  .filter(Boolean)
  .join('\n    ')

let html = await readFile(path.join(dist, 'index.html'), 'utf8')
if (!html.includes('<!--app-->')) throw new Error('Marcador <!--app--> não encontrado em dist/index.html')
html = html.replace('<!--app-->', appHtml).replace('<!--head-extra-->', headExtra)
html = html.replace('content="/og-image.png"', siteUrl ? `content="${siteUrl}/og-image.png"` : `content="${base}og-image.png"`)
await writeFile(path.join(dist, 'index.html'), html)

// robots.txt e sitemap.xml
const robots = ['User-agent: *', 'Allow: /', siteUrl && `Sitemap: ${siteUrl}/sitemap.xml`].filter(Boolean).join('\n') + '\n'
await writeFile(path.join(dist, 'robots.txt'), robots)
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod></url>
  <url><loc>${siteUrl}/privacidade.html</loc><lastmod>${today}</lastmod></url>
</urlset>
`
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap)
}

await rm(ssrDir, { recursive: true, force: true })
console.log(`✓ Pré-renderizado: ${(appHtml.length / 1024).toFixed(0)} KB de HTML${siteUrl ? ` · URL ${siteUrl}` : ' · SITE_URL não definido (sem canonical/sitemap)'}`)

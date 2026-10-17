/**
 * Publica no GitHub Pages (branch gh-pages), sem depender de GitHub Actions.
 * Uso: npm run deploy
 *
 * Lê o repositório do remote "origin" e o número de WhatsApp do .env
 * (VITE_WHATSAPP_NUMBER). Depois de publicar, reconstrói o dist/ local
 * com base "/" para o `npm run preview` continuar funcionando.
 */
import { execFileSync } from 'node:child_process'
import { cpSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// npm é um .cmd no Windows e precisa de shell; git e gh não (e assim os argumentos com espaço ficam intactos)
const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { cwd: root, stdio: 'inherit', shell: cmd === 'npm' && process.platform === 'win32', ...opts })
const out = (cmd, args) => execFileSync(cmd, args, { cwd: root, encoding: 'utf8' }).trim()

const remote = out('git', ['remote', 'get-url', 'origin'])
const match = remote.match(/github\.com[:/]([^/]+)\/(.+?)(\.git)?$/)
if (!match) throw new Error(`Remote "origin" não é do GitHub: ${remote}`)
const [, owner, repo] = match

const env = loadEnv('production', root, '')
if (!env.VITE_WHATSAPP_NUMBER && !env.VITE_LEAD_ENDPOINT) {
  throw new Error('Defina VITE_WHATSAPP_NUMBER (ou VITE_LEAD_ENDPOINT) no arquivo .env antes de publicar.')
}

const BASE_PATH = `/${repo}/`
const SITE_URL = `https://${owner.toLowerCase()}.github.io/${repo}`
console.log(`→ Build para ${SITE_URL}`)
run('npm', ['run', 'build'], { env: { ...process.env, BASE_PATH, SITE_URL } })

const pub = path.join(root, 'dist-pages')
rmSync(pub, { recursive: true, force: true })
cpSync(path.join(root, 'dist'), pub, { recursive: true })
writeFileSync(path.join(pub, '.nojekyll'), '')

const sha = out('git', ['rev-parse', '--short', 'HEAD'])
const git = (...args) => run('git', args, { cwd: pub })
git('init', '-q', '-b', 'gh-pages')
git('add', '-A')
// mesma identidade de autor do repositório principal
const name = out('git', ['log', '-1', '--format=%an'])
const email = out('git', ['log', '-1', '--format=%ae'])
git('-c', `user.name=${name}`, '-c', `user.email=${email}`, '-c', 'core.autocrlf=false', 'commit', '-q', '-m', `Publicação a partir de ${sha}`)
git('push', '-f', '-q', remote, 'gh-pages')
rmSync(pub, { recursive: true, force: true })

try {
  run('gh', ['api', '-X', 'POST', `repos/${owner}/${repo}/pages/builds`, '--silent'])
} catch {
  console.warn('Aviso: não consegui pedir o build pelo gh; o GitHub costuma iniciar sozinho após o push.')
}

console.log('→ Reconstruindo dist/ local (base "/")')
run('npm', ['run', 'build'], { env: { ...process.env, BASE_PATH: '', SITE_URL: '' } })
console.log(`✓ Publicado. Em ~1 minuto: ${SITE_URL}/`)

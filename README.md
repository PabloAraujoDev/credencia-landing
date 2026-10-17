# Credencia: landing page

Landing page do sistema de credenciamento de formaturas. Conversão principal: **pedido de demonstração**.

**No ar:** https://pabloaraujodev.github.io/credencia-landing/
Os pedidos chegam pelo WhatsApp **(35) 98896-1475**.

React 19 · TypeScript · Vite · Tailwind CSS v4 · HTML pré-renderizado no build (SEO e primeira pintura sem depender de JS).

## Comandos

```bash
npm install
npm run dev          # desenvolvimento em http://localhost:5173
npm run build        # checa tipos, gera dist/ e pré-renderiza o HTML
npm run preview      # serve dist/ em http://localhost:4173
npm run test:e2e     # testes no Microsoft Edge (rode `npm run build` antes)
npm run images       # regenera og-image.png e apple-touch-icon.png (com o preview rodando)
npm run deploy       # publica no GitHub Pages (branch gh-pages)
npx vite preview --host   # serve o build na rede local (celular no mesmo Wi-Fi)
```

## Publicação

`npm run deploy` gera o build para `/credencia-landing/`, envia para a branch `gh-pages` e reconstrói o `dist/` local. Precisa de `VITE_WHATSAPP_NUMBER` no `.env`, que fica fora do git.

**Deploy automático (opcional):** o login atual do `gh` não tem permissão para enviar workflows. Para publicar a cada push na `main`:

1. Rode `gh auth refresh -s workflow`.
2. Mova `deploy/github-pages-workflow.yml` para `.github/workflows/deploy.yml`.
3. Em *Settings → Pages*, troque a origem para **GitHub Actions**.

A variável `VITE_WHATSAPP_NUMBER` já está cadastrada no repositório.

## Configuração (`.env`, veja `.env.example`)

| Variável | Para quê | Se ficar vazia |
|---|---|---|
| `VITE_WHATSAPP_NUMBER` | Número que recebe os pedidos (DDI + DDD + número, só dígitos). O formulário abre o WhatsApp com a mensagem pronta. | Usa `VITE_LEAD_ENDPOINT`. Se os dois estiverem vazios, o envio mostra erro. |
| `VITE_LEAD_ENDPOINT` | URL que recebe o formulário (POST JSON): Formspree, Web3Forms ou função própria. Tem prioridade sobre o WhatsApp. | Em produção o envio mostra erro, **nunca finge sucesso**. Em `npm run dev` o envio é simulado (`?lead=erro` simula falha). |
| `BASE_PATH` | Caminho da publicação. O `npm run deploy` define sozinho. | `/` |
| `SITE_URL` | Domínio final, sem barra no fim | Sem canonical, `og:url`, sitemap e URL absoluta da imagem de compartilhamento. |
| `VITE_CONTACT_EMAIL` | E-mail alternativo mostrado quando o envio falha | A mensagem de erro aparece sem e-mail. |
| `VITE_PLAUSIBLE_DOMAIN` | Medição sem cookies (Plausible) | Nenhum script de medição é carregado. |

Eventos medidos (sem dados pessoais): `cta_click` (com o local do botão), `form_view`, `form_start`, `form_submit`, `form_success`, `form_error`, `scanner_demo`, `brand_demo`.

## Estrutura

```
src/
  content/        textos (site.ts, copy.ts). O nome comercial fica em site.ts.
  components/
    ui/           Button, Container, SectionHeader, Logo, Pipeline
    layout/       Header, Footer, MobileCtaBar
    mockups/      telas do produto recriadas em HTML/CSS (escala por container query; marca por variáveis CSS)
    LeadForm.tsx, ScannerSimulator.tsx
  sections/       uma seção por arquivo, na ordem da página
  styles/         tokens (@theme), fontes auto-hospedadas, mockups.css
  lib/            envio e validação do formulário, medição, revelação ao rolar
scripts/          pré-renderização e geração de imagens
tests/            Playwright: interações (desktop e celular) e produção (SEO, a11y, erros)
public/           favicon, imagens de compartilhamento, política de privacidade
```

## Antes de publicar (briefing §15)

- [x] Nome comercial: **Credencia**
- [x] Canal de pedidos: WhatsApp (35) 98896-1475
- [x] Publicado no GitHub Pages
- [ ] Revisar `public/privacidade.html` com o jurídico e incluir a razão social do controlador.
- [ ] Validar os textos de segurança com o responsável pelo produto.
- [ ] Domínio próprio (opcional): configurar em *Settings → Pages → Custom domain* e ajustar `SITE_URL`/`BASE_PATH`.
- [ ] Se houver capturas reais em alta resolução, comparar com as telas recriadas em `src/components/mockups/`.

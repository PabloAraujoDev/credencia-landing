# Credencia: landing page

Landing page do sistema de credenciamento de formaturas. Conversão principal: **pedido de demonstração**.

React 19 · TypeScript · Vite · Tailwind CSS v4 · HTML pré-renderizado no build (SEO e primeira pintura sem depender de JS).

## Comandos

```bash
npm install
npm run dev          # desenvolvimento em http://localhost:5173
npm run build        # checa tipos, gera dist/ e pré-renderiza o HTML
npm run preview      # serve dist/ em http://localhost:4173
npm run test:e2e     # testes no Microsoft Edge (rode `npm run build` antes)
npm run images       # regenera og-image.png e apple-touch-icon.png (com o preview rodando)
```

## Configuração (`.env`, veja `.env.example`)

| Variável | Para quê | Se ficar vazia |
|---|---|---|
| `VITE_LEAD_ENDPOINT` | URL que recebe o formulário (POST JSON): Formspree, Web3Forms ou função própria | Em produção o envio mostra erro, **nunca finge sucesso**. Em `npm run dev` o envio é simulado (`?lead=erro` simula falha). |
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

- [ ] Confirmar o **nome comercial** (hoje é "Credencia", provisório): `src/content/site.ts`, `index.html` e `public/privacidade.html`.
- [ ] Configurar `VITE_LEAD_ENDPOINT` e testar um envio real.
- [ ] Revisar `public/privacidade.html` com o jurídico e completar a identificação do controlador e o canal de contato.
- [ ] Validar os textos de segurança com o responsável pelo produto.
- [ ] Definir `SITE_URL` e rodar `npm run build` de novo.
- [ ] Se houver capturas reais em alta resolução, comparar com as telas recriadas em `src/components/mockups/`.

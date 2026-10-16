import { defineConfig } from '@playwright/test'

/**
 * Dois alvos:
 *  - interações: servidor de desenvolvimento em modo "test" (VITE_LEAD_ENDPOINT=/api/lead,
 *    interceptado nos testes para simular sucesso, erro e lentidão do envio);
 *  - produção: o build pré-renderizado em dist/ (rode `npm run build` antes).
 * Usa o Microsoft Edge instalado (channel: 'msedge'), sem baixar navegadores.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  workers: 4,
  fullyParallel: true,
  reporter: [['list']],
  use: { channel: 'msedge', trace: 'retain-on-failure' },
  webServer: [
    { command: 'npx vite --mode test --port 5174 --strictPort', url: 'http://localhost:5174', reuseExistingServer: true },
    { command: 'npx vite preview --port 4173 --strictPort', url: 'http://localhost:4173', reuseExistingServer: true },
    { command: 'npx vite --mode whatsapp --port 5175 --strictPort', url: 'http://localhost:5175', reuseExistingServer: true },
  ],
  projects: [
    {
      name: 'whatsapp',
      testMatch: /whatsapp\.spec\.ts/,
      use: { baseURL: 'http://localhost:5175', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
    },
    {
      name: 'desktop',
      testMatch: /interacoes\.spec\.ts/,
      use: { baseURL: 'http://localhost:5174', viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      testMatch: /interacoes\.spec\.ts/,
      use: { baseURL: 'http://localhost:5174', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    },
    {
      name: 'tablet',
      testMatch: /producao\.spec\.ts/,
      use: { baseURL: 'http://localhost:4173', viewport: { width: 820, height: 1180 } },
    },
    {
      name: 'producao',
      testMatch: /producao\.spec\.ts/,
      use: { baseURL: 'http://localhost:4173', viewport: { width: 1440, height: 900 } },
    },
  ],
})

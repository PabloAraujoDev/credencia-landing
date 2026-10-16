import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'

export { faqs } from './content/copy'
export { site } from './content/site'

/** Usado só no build (scripts/prerender.mjs) para gerar o HTML estático. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

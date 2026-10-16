type EventName = 'cta_click' | 'form_start' | 'form_submit' | 'form_success' | 'form_error' | 'form_view' | 'scanner_demo' | 'brand_demo'

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
    dataLayer?: unknown[]
  }
}

/**
 * Medição de conversão (briefing §14). Envia para o Plausible quando
 * configurado e para o dataLayer quando existir (GTM). Nunca envia dados
 * pessoais do formulário — apenas o nome do evento e o local do clique.
 */
export function track(event: EventName, props: Record<string, string> = {}): void {
  if (typeof window === 'undefined') return
  try {
    window.plausible?.(event, { props })
    window.dataLayer?.push({ event, ...props })
  } catch {
    /* medição nunca pode quebrar a página */
  }
}

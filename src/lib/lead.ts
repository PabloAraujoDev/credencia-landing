import { env } from '../content/site'

export interface LeadData {
  nome: string
  empresa: string
  email: string
  whatsapp: string
  volume: string
  consentimento: boolean
}

export type LeadErrors = Partial<Record<keyof LeadData, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

/** Máscara de telefone brasileiro: (11) 99999-9999 ou (11) 3333-4444 */
export function maskPhone(value: string): string {
  const d = onlyDigits(value).slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function validateLead(data: LeadData): LeadErrors {
  const errors: LeadErrors = {}
  if (data.nome.trim().length < 2) errors.nome = 'Informe seu nome.'
  if (data.empresa.trim().length < 2) errors.empresa = 'Informe o nome da empresa.'
  if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Informe um e-mail válido, como nome@empresa.com.br.'
  const phone = onlyDigits(data.whatsapp)
  if (phone.length < 10 || phone.length > 11) errors.whatsapp = 'Informe o WhatsApp com DDD, como (11) 99999-9999.'
  if (!data.volume) errors.volume = 'Selecione quantas formaturas vocês fazem por ano.'
  if (!data.consentimento) errors.consentimento = 'Precisamos do seu consentimento para entrar em contato.'
  return errors
}

/** Monta o link do WhatsApp com o pedido já escrito (wa.me aceita texto pré-preenchido). */
export function buildWhatsAppUrl(data: LeadData, number = env.whatsappNumber, product = 'sistema de credenciamento'): string {
  const text = [
    `Olá! Quero uma demonstração do ${product}.`,
    '',
    `Nome: ${data.nome.trim()}`,
    `Empresa: ${data.empresa.trim()}`,
    `E-mail: ${data.email.trim()}`,
    `WhatsApp: ${data.whatsapp.trim()}`,
    `Formaturas por ano: ${data.volume}`,
  ].join('\n')
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}

export class LeadSubmitError extends Error {
  constructor(
    message: string,
    readonly kind: 'network' | 'server' | 'timeout' | 'config',
  ) {
    super(message)
  }
}

/**
 * Envia o pedido de demonstração para VITE_LEAD_ENDPOINT (POST JSON).
 * Compatível com Formspree, Web3Forms ou uma função própria.
 * Sem endpoint: em desenvolvimento simula o envio (para testar os estados
 * da interface); em produção falha de forma explícita — nunca finge sucesso.
 */
export async function submitLead(data: LeadData, signal?: AbortSignal): Promise<void> {
  const payload = {
    ...data,
    whatsapp: onlyDigits(data.whatsapp),
    origem: 'landing-page',
    enviadoEm: new Date().toISOString(),
  }

  if (!env.leadEndpoint) {
    if (import.meta.env.DEV) {
      await new Promise((r) => setTimeout(r, 900))
      if (new URLSearchParams(location.search).get('lead') === 'erro') {
        throw new LeadSubmitError('Simulação de falha (modo desenvolvimento).', 'server')
      }
      console.info('[lead] VITE_LEAD_ENDPOINT não configurado — envio simulado em desenvolvimento.', payload)
      return
    }
    throw new LeadSubmitError('O envio do formulário ainda não está configurado.', 'config')
  }

  const timeout = AbortSignal.timeout(15000)
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout

  let response: Response
  try {
    response = await fetch(env.leadEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: combined,
    })
  } catch (err) {
    if (timeout.aborted) throw new LeadSubmitError('O envio demorou demais.', 'timeout')
    throw new LeadSubmitError(err instanceof Error ? err.message : 'Falha de rede.', 'network')
  }
  if (!response.ok) throw new LeadSubmitError(`Resposta ${response.status} do servidor.`, 'server')
}

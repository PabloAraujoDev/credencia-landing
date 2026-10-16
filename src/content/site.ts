/**
 * Dados globais do site. O nome comercial ainda é provisório (briefing §1):
 * troque aqui e ele muda em toda a página.
 */
export const site = {
  name: 'Credencia',
  tagline: 'Credenciamento de formaturas',
  title: 'Credenciamento de formaturas com QR Code e a sua marca | Credencia',
  description:
    'O formando cadastra convidados e assina o termo no celular. Sua equipe gera convites com QR Code e confere a entrada em segundos. Peça uma demonstração.',
  year: 2026,
} as const

export const nav = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Para quem usa', href: '#para-quem-usa' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Segurança', href: '#seguranca' },
  { label: 'Perguntas', href: '#perguntas' },
] as const

export const cta = {
  primary: { label: 'Peça uma demonstração', href: '#demonstracao' },
  secondary: { label: 'Veja como funciona', href: '#como-funciona' },
  trial: { label: 'Quero testar com a minha formatura', href: '#demonstracao' },
} as const

const leadEndpoint = (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined)?.trim() || ''
const whatsappNumber = ((import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) || '').replace(/\D/g, '')

export const env = {
  leadEndpoint,
  /** Número com DDI e DDD, só dígitos (ex.: 5511999999999) */
  whatsappNumber,
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || '',
  /** endpoint: POST JSON · whatsapp: abre a conversa com a mensagem pronta */
  leadMode: leadEndpoint ? 'endpoint' : whatsappNumber ? 'whatsapp' : 'none',
} as const

/** Caminho base do site (GitHub Pages publica em /<repositório>/) */
export const basePath = import.meta.env.BASE_URL

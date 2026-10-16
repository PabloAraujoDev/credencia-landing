import { site } from '../../content/site'

interface LogoProps {
  tone?: 'light' | 'dark'
  className?: string
}

/** Marca provisória: moldura de leitura de QR + confirmação. */
export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" fill="#4b2e7a" />
      <path d="M8 13V9.5A1.5 1.5 0 0 1 9.5 8H13M19 8h3.5A1.5 1.5 0 0 1 24 9.5V13M24 19v3.5a1.5 1.5 0 0 1-1.5 1.5H19M13 24H9.5A1.5 1.5 0 0 1 8 22.5V19" fill="none" stroke="#dbbb4b" strokeWidth="2.2" strokeLinecap="round" />
      <path d="m11.8 16.3 2.9 2.9 5.6-6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ tone = 'dark', className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className={`font-wide text-[1.15rem] font-bold tracking-[-0.03em] ${tone === 'light' ? 'text-white' : 'text-ink'}`}>
        {site.name}
      </span>
    </span>
  )
}

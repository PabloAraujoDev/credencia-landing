import type { ReactNode } from 'react'

interface SectionHeaderProps {
  id?: string
  eyebrow: string
  index?: string
  title: ReactNode
  lead?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  /** `md` para colunas estreitas */
  size?: 'lg' | 'md'
  className?: string
}

/** Cabeçalho padrão de seção: rótulo técnico (mono) + título expressivo + apoio. */
export function SectionHeader({ id, eyebrow, index, title, lead, tone = 'light', align = 'left', size = 'lg', className = '' }: SectionHeaderProps) {
  const dark = tone === 'dark'
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`} data-reveal>
      <p className={`eyebrow flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${dark ? 'text-gold-400' : 'text-violet-600'}`}>
        {index && <span className={dark ? 'text-white/60' : 'text-ink-mute'}>{index}</span>}
        <span aria-hidden="true" className={`h-px w-6 ${dark ? 'bg-gold-500/60' : 'bg-violet-300'}`} />
        {eyebrow}
      </p>
      <h2 id={id} className={`font-display mt-5 ${size === 'lg' ? 'text-[clamp(2.1rem,4.4vw,3.6rem)]' : 'text-[clamp(2rem,3.2vw,2.75rem)]'} text-balance ${dark ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {lead && <p className={`mt-6 text-lg leading-relaxed text-pretty ${dark ? 'text-white/70' : 'text-ink-soft'}`}>{lead}</p>}
    </div>
  )
}

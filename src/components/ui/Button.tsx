import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { track } from '../../lib/analytics'

type Variant = 'primary' | 'secondary-dark' | 'secondary-light'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-[background-color,box-shadow,transform,color,border-color] duration-200 ease-out active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70'

const variants: Record<Variant, string> = {
  primary:
    'bg-gold-400 text-night-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_1px_2px_rgb(12_6_18/0.25),0_8px_24px_-8px_rgb(201_162_39/0.6)] hover:bg-gold-300 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_1px_2px_rgb(12_6_18/0.25),0_12px_32px_-8px_rgb(201_162_39/0.75)]',
  'secondary-dark': 'border border-white/15 bg-white/5 text-white backdrop-blur hover:border-white/30 hover:bg-white/10',
  'secondary-light': 'border border-line bg-white text-ink shadow-[0_1px_2px_rgb(23_17_31/0.06)] hover:border-violet-300 hover:text-violet-700',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-13 px-7 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  arrow?: boolean
  children: ReactNode
  className?: string
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  )
}

/** Link com aparência de botão. `trackAs` registra o clique como conversão. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow,
  children,
  className = '',
  trackAs,
  onClick,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { trackAs?: string }) {
  return (
    <a
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={(e) => {
        if (trackAs) track('cta_click', { local: trackAs })
        onClick?.(e)
      }}
      {...rest}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  arrow,
  children,
  className = '',
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  )
}

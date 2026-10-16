import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cta, nav } from '../../content/site'
import { useScrolled } from '../../hooks/useScrolled'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

export function Header() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? 'border-b border-white/10 bg-night-950/80 backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-night-950"
      >
        Pular para o conteúdo
      </a>
      <Container className="flex h-[4.25rem] items-center justify-between gap-6">
        <a href="#topo" aria-label="Credencia — início" className="rounded-lg">
          <Logo tone="light" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={cta.primary.href} trackAs="header" className="max-sm:hidden" size="md">
            {cta.primary.label}
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movel"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div id="menu-movel" hidden={!open} className="h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-white/10 bg-night-950/95 backdrop-blur-xl lg:hidden">
        <Container className="py-4">
          <nav aria-label="Menu móvel">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/5 py-3.5 text-lg font-medium text-white/85 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href={cta.primary.href} trackAs="menu-movel" onClick={() => setOpen(false)} size="lg" className="mt-5 w-full" arrow>
            {cta.primary.label}
          </ButtonLink>
        </Container>
      </div>
    </header>
  )
}

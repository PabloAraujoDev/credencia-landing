import { useEffect, useState } from 'react'
import { cta } from '../../content/site'
import { ButtonLink } from '../ui/Button'

/**
 * Barra de ação fixa no celular: aparece depois do hero e some quando o
 * formulário está na tela (não compete com ele).
 */
export function MobileCtaBar() {
  const [pastHero, setPastHero] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('topo')
    const form = document.getElementById('demonstracao')
    if (!hero || !form || !('IntersectionObserver' in window)) return
    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { rootMargin: '-35% 0px 0px 0px' })
    const formIo = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0 })
    heroIo.observe(hero)
    formIo.observe(form)
    return () => {
      heroIo.disconnect()
      formIo.disconnect()
    }
  }, [])

  const show = pastHero && !formVisible

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night-950/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <ButtonLink href={cta.primary.href} trackAs="barra-movel" size="lg" arrow className="w-full">
        {cta.primary.label}
      </ButtonLink>
    </div>
  )
}

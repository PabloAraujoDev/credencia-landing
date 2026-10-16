import type { CSSProperties } from 'react'
import { featureGroups } from '../content/copy'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'

/** Recursos em formato de índice técnico — sem grade de cartões. */
export function Features() {
  return (
    <section id="recursos" aria-labelledby="recursos-title" className="relative border-t border-line bg-paper py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="recursos-title"
          index="04"
          eyebrow="Recursos"
          title="Tudo o que a operação precisa, no mesmo sistema."
          lead="Sem módulos avulsos e sem integrar ferramentas diferentes para lista, termo, convite e portaria."
        />

        <div className="mt-16 grid gap-x-10 gap-y-14 border-t border-ink/10 pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {featureGroups.map((group, g) => (
            <div key={group.title} data-reveal style={{ '--reveal-delay': `${g * 70}ms` } as CSSProperties}>
              <p className="font-mono text-xs text-ink-mute">{String(g + 1).padStart(2, '0')}</p>
              <h3 className="font-wide mt-2 text-lg font-semibold tracking-[-0.02em]">{group.title}</h3>
              <ul className="mt-5">
                {group.items.map((item) => (
                  <li key={item} className="border-t border-line py-3.5 text-[0.95rem] leading-snug text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

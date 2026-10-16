import type { CSSProperties } from 'react'
import { CornerDownRight } from 'lucide-react'
import { problems } from '../content/copy'
import { site } from '../content/site'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'

export function Problem() {
  return (
    <section aria-labelledby="problema-title" className="relative bg-paper py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeader
                id="problema-title"
                index="01"
                eyebrow="O problema"
                title="Hoje, a operação da formatura está espalhada."
                lead="Planilha, grupo de mensagens, papel e uma fila na porta. Cada pedaço em um lugar e ninguém com a visão inteira."
              />
            </div>
          </div>

          <ol className="lg:col-span-7">
            {problems.map((p, i) => (
              <li
                key={p.tag}
                data-reveal
                style={{ '--reveal-delay': '40ms' } as CSSProperties}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-8 first:border-t-0 first:pt-0 sm:gap-x-8 lg:first:pt-2"
              >
                <span className="pt-1.5 font-mono text-sm text-ink-mute">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-[clamp(1.35rem,2.3vw,1.85rem)] font-semibold leading-snug tracking-[-0.02em] text-ink">
                    <span className="strike [.is-visible_&]:text-ink-mute">{p.before}</span>
                  </p>
                  <div className="mt-4 flex gap-3">
                    <CornerDownRight aria-hidden="true" className="mt-0.5 size-5 flex-none text-violet-500" />
                    <p className="text-ink-soft">
                      <span className="mr-2 rounded-md bg-violet-100 px-1.5 py-0.5 font-mono text-[0.72rem] font-medium tracking-[0.04em] text-violet-700 uppercase">
                        com {site.name}
                      </span>
                      {p.after}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

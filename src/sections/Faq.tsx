import { Plus } from 'lucide-react'
import { faqs } from '../content/copy'
import { cta } from '../content/site'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="faq-title" className="bg-paper py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeader id="faq-title" index="07" eyebrow="Perguntas frequentes" size="md" title="Antes de pedir a demonstração." />
              <p className="mt-6 text-ink-soft">
                Ficou alguma dúvida?{' '}
                <a href={cta.primary.href} className="font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4 hover:decoration-violet-700">
                  Pergunte no formulário
                </a>
                .
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-ink/10">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-ink/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-semibold tracking-[-0.015em] text-ink marker:hidden hover:text-violet-700 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid size-8 flex-none place-items-center rounded-full border border-line bg-white text-ink-soft transition-transform duration-300 group-open:rotate-45 group-open:border-violet-300 group-open:text-violet-700">
                      <Plus aria-hidden="true" className="size-4" />
                    </span>
                  </summary>
                  <p className="-mt-1 max-w-2xl pb-7 pr-12 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

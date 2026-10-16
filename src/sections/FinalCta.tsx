import { useEffect, useRef } from 'react'
import { track } from '../lib/analytics'
import { LeadForm } from '../components/LeadForm'
import { Container } from '../components/ui/Container'

const next = [
  ['Você envia o pedido', 'São só cinco campos.'],
  ['Falamos com você', 'Para entender o tamanho da sua operação.'],
  ['Demonstração ao vivo', 'No ambiente de teste, com dados fictícios.'],
]

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track('form_view')
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} id="demonstracao" aria-labelledby="demo-title" className="relative isolate overflow-hidden bg-night-950 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="bg-grid-dark mask-radial absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute right-[-10%] top-1/3 -z-10 h-[560px] w-[760px] rounded-full bg-violet-700/35 blur-[140px]" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-0">
          <div className="lg:col-span-5 lg:row-start-1 lg:pt-6">
            <p className="eyebrow flex items-center gap-3 text-gold-400">
              <span className="text-white/60">08</span>
              <span aria-hidden="true" className="h-px w-6 bg-gold-500/60" />
              Demonstração
            </p>
            <h2 id="demo-title" className="font-display mt-5 text-[clamp(2.2rem,3.6vw,3.2rem)] text-balance">
              Veja o sistema rodando com a sua formatura.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Mostramos a jornada completa, do cadastro da turma à leitura do QR na portaria. O valor depende do tamanho da operação e vem em uma proposta.
            </p>
          </div>

          {/* No celular o formulário vem logo após o título; no desktop fica à direita */}
          <ol className="order-last lg:order-none lg:col-span-5 lg:row-start-2 lg:mt-12 lg:self-start">
              {next.map(([title, text], i) => (
                <li key={title} className="relative grid grid-cols-[32px_1fr] gap-x-5 pb-8 last:pb-0">
                  {i < next.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-[15.5px] top-9 w-px bg-gold-500/35" />}
                  <span className="grid size-8 place-items-center rounded-full border border-gold-500/50 font-mono text-xs text-gold-300">{i + 1}</span>
                  <div className="pt-1">
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-white/60">{text}</p>
                  </div>
                </li>
              ))}
          </ol>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="relative rounded-[1.75rem] bg-gradient-to-b from-gold-400/60 via-white/10 to-white/5 p-px shadow-[0_50px_100px_-40px_rgb(0_0_0/0.8)]">
              <div className="relative rounded-[calc(1.75rem-1px)] bg-paper p-6 text-ink sm:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-wide text-xl font-semibold tracking-[-0.02em]">Peça uma demonstração</p>
                    <p className="mt-1 text-sm text-ink-mute">Para empresas de formatura e assessorias de eventos.</p>
                  </div>
                  <span className="hidden rounded-md border border-line px-2 py-1 font-mono text-[0.68rem] tracking-[0.08em] text-ink-mute uppercase sm:inline">convite · 01</span>
                </div>

                {/* Picote de convite */}
                <div aria-hidden="true" className="relative -mx-6 my-8 sm:-mx-10">
                  <span className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-night-950" />
                  <span className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-night-950" />
                  <span className="mx-6 block border-t-2 border-dashed border-line" />
                </div>

                <div>
                  <LeadForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

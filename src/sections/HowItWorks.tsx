import { useRef } from 'react'
import { steps } from '../content/copy'
import { cta } from '../content/site'
import { stepScreens } from '../components/mockups/StepScreens'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useActiveIndex } from '../hooks/useActiveIndex'

const surfaceTone = {
  Painel: 'text-violet-300 border-violet-300/30 bg-violet-300/10',
  Portal: 'text-gold-300 border-gold-400/30 bg-gold-400/10',
  Portaria: 'text-go-bright border-go-bright/30 bg-go-bright/10',
} as const

/** Palco fixo: as 7 telas empilhadas, só a do passo ativo aparece. */
function Stage({ active }: { active: number }) {
  return (
    <div aria-hidden="true" className="relative @container">
      <div className="bg-grid-dark relative aspect-[1/1.02] overflow-hidden rounded-3xl border border-white/10 bg-night-900">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
        <div className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/30 blur-[90px]" />
        <div className="absolute left-5 top-4 flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] text-white/55 uppercase">
          <span className="size-1.5 rounded-full bg-gold-400" />
          Passo {String(active + 1).padStart(2, '0')} / 07 · {steps[active].surface}
        </div>
        {stepScreens.map((Screen, i) => (
          <div
            key={steps[i].id}
            className={`mk absolute inset-0 flex items-center px-[9%] pt-[6%] transition-[opacity,transform] duration-500 ease-out ${
              i === active ? 'is-active opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
            }`}
            style={{ fontSize: 'calc(100cqw / 30)' }}
          >
            <div className="w-full">
              <Screen />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null)
  const active = useActiveIndex(listRef)

  return (
    <section id="como-funciona" aria-labelledby="como-title" className="relative overflow-clip bg-night-950 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="bg-grid-dark mask-fade-b absolute inset-x-0 top-0 h-[520px] opacity-60" />
      <Container className="relative">
        <SectionHeader
          id="como-title"
          index="02"
          eyebrow="Como funciona"
          tone="dark"
          title="Sete passos. Uma plataforma. Do cadastro à porta."
          lead="Cada etapa alimenta a próxima: a lista aprovada vira termo, o termo assinado libera o convite e o convite vira entrada na portaria."
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28">
              <Stage active={active} />
            </div>
          </div>

          <ol ref={listRef} className="relative lg:col-span-6">
            {/* Trilho do pipeline */}
            <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-gold-500/10 via-gold-500/50 to-gold-500/10" />
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = i === active
              return (
                <li key={step.id} data-index={i} className="relative grid grid-cols-[40px_1fr] gap-x-6 py-7 lg:min-h-[34vh] lg:py-10 lg:first:pt-0">
                  <span
                    className={`relative z-10 grid size-10 place-items-center rounded-full border bg-night-950 transition-[border-color,box-shadow,color] duration-500 ${
                      isActive ? 'border-gold-400 text-gold-300 shadow-[0_0_0_6px_rgb(201_162_39/0.12),0_0_24px_rgb(201_162_39/0.35)]' : 'border-white/15 text-white/55'
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-[18px]" />
                  </span>
                  <div className="lg:pt-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-white/60">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`rounded-full border px-2 py-0.5 font-mono text-[0.68rem] tracking-[0.08em] uppercase ${surfaceTone[step.surface]}`}>
                        {step.surface}
                      </span>
                    </div>
                    <h3 className={`font-wide mt-3 text-2xl font-semibold tracking-[-0.025em] transition-colors duration-500 sm:text-[1.7rem] ${isActive ? 'text-white' : 'lg:text-white/65'}`}>{step.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-white/70">{step.text}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-6 flex flex-col items-start gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-white/70">Quer ver esse fluxo com os dados da sua próxima formatura?</p>
          <ButtonLink href={cta.trial.href} arrow trackAs="como-funciona">
            {cta.trial.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}

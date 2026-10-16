import { useRef, useState, type KeyboardEvent } from 'react'
import { Check, MonitorSmartphone, ScanLine, Smartphone } from 'lucide-react'
import { personas, type PersonaId } from '../content/copy'
import { brands } from '../components/mockups/brands'
import { BrowserFrame, PhoneFrame } from '../components/mockups/Frames'
import { InviteArtMock } from '../components/mockups/InviteArtMock'
import { PortalMock } from '../components/mockups/PortalMock'
import { SignatureContent } from '../components/mockups/StepScreens'
import { ScannerSimulator } from '../components/ScannerSimulator'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'

const tabIcons = { empresa: MonitorSmartphone, formando: Smartphone, portaria: ScanLine } as const

function Visual({ id }: { id: PersonaId }) {
  if (id === 'empresa') {
    return (
      <BrowserFrame
        onLight
        url="painel · Arte do convite"
        label="Painel da empresa: a arte do convite enviada com a área do QR Code marcada, quatro convites gerados automaticamente e a lista de operadores de portaria."
      >
        <InviteArtMock brand={brands.alfa} />
      </BrowserFrame>
    )
  }
  if (id === 'formando') {
    return (
      <div className="relative mx-auto flex max-w-[560px] items-start justify-center gap-5 sm:gap-8">
        <PhoneFrame className="w-[46%] max-w-[250px]" screenClassName="is-static" label="Portal do formando: tela de assinatura do termo de responsabilidade com o dedo.">
          <SignatureContent />
        </PhoneFrame>
        <PhoneFrame className="mt-14 w-[46%] max-w-[250px]" label="Portal do formando: termo assinado e dois convites com QR Code prontos para baixar e enviar.">
          <PortalMock brand={brands.alfa} />
        </PhoneFrame>
      </div>
    )
  }
  return (
    <div className="rounded-3xl bg-night-950 p-6 sm:p-10">
      <ScannerSimulator />
    </div>
  )
}

export function Personas() {
  const [active, setActive] = useState<PersonaId>('empresa')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = personas.length - 1
    let next: number | null = null
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1
    if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(personas[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="para-quem-usa" aria-labelledby="personas-title" className="relative bg-white py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="personas-title"
            index="03"
            eyebrow="Para quem usa"
            title="Uma plataforma, três telas."
            lead="Cada pessoa vê só o que precisa: a empresa organiza, o formando resolve pelo celular e a portaria confere."
          />

          <div role="tablist" aria-label="Perfis de uso" className="inline-flex self-start rounded-full border border-line bg-paper p-1 lg:self-auto">
            {personas.map((p, i) => {
              const Icon = tabIcons[p.id]
              const selected = active === p.id
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls={`painel-${p.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(p.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.95rem] font-semibold transition-colors sm:px-5 ${
                    selected ? 'bg-night-900 text-white shadow-[0_6px_16px_-8px_rgb(27_16_36/0.6)]' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {p.label}
                </button>
              )
            })}
          </div>
        </div>

        {personas.map((p) => (
          <div
            key={p.id}
            role="tabpanel"
            id={`painel-${p.id}`}
            aria-labelledby={`tab-${p.id}`}
            hidden={active !== p.id}
            tabIndex={0}
            className="mt-14 grid gap-12 rounded-lg lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-14"
          >
            <div className="lg:col-span-4">
              <p className="eyebrow text-violet-600">{p.kicker}</p>
              <h3 className="font-wide mt-4 text-[clamp(1.7rem,2.6vw,2.2rem)] font-semibold leading-tight tracking-[-0.03em] text-balance">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{p.text}</p>
              <ul className="mt-7 space-y-3.5">
                {p.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.97rem] text-ink">
                    <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-violet-100 text-violet-700">
                      <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 lg:col-span-8">
              <Visual id={p.id} />
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}

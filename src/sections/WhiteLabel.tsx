import { useRef, useState } from 'react'
import { track } from '../lib/analytics'
import { brands, type DemoBrand } from '../components/mockups/brands'
import { DashboardMock } from '../components/mockups/DashboardMock'
import { BrowserFrame, PhoneFrame } from '../components/mockups/Frames'
import { PortalMock } from '../components/mockups/PortalMock'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'

const applied = ['Nome e logo', 'Cores', 'Textos jurídicos', 'Convites', 'Mensagens']
const options: { brand: DemoBrand; swatch: string }[] = [
  { brand: brands.alfa, swatch: '#4b2e7a' },
  { brand: brands.lume, swatch: '#0f6b63' },
]

/** O mesmo sistema vestindo duas marcas fictícias: painel, portal e convite. */
export function WhiteLabel() {
  const [current, setCurrent] = useState<DemoBrand['id']>('alfa')
  const tracked = useRef(false)
  const brand = brands[current]

  const choose = (id: DemoBrand['id']) => {
    setCurrent(id)
    if (!tracked.current && id !== 'alfa') {
      tracked.current = true
      track('brand_demo')
    }
  }

  return (
    <section aria-labelledby="marca-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div aria-hidden="true" className="bg-grid-light mask-radial absolute inset-0" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeader id="marca-title" index="05" eyebrow="Sua marca" title="O formando enxerga a sua empresa. Não a nossa." className="lg:col-span-7" />
          <div className="lg:col-span-5" data-reveal>
            <p className="text-lg leading-relaxed text-ink-soft">
              Cada empresa-cliente recebe uma instalação própria, com a identidade dela aplicada em todo o sistema: no painel, no portal do formando e nos convites.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {applied.map((a) => (
                <li key={a} className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[0.72rem] tracking-[0.04em] text-ink-soft uppercase">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-reveal>
          <p id="marca-escolha" className="font-mono text-xs tracking-[0.08em] text-ink-mute uppercase">
            Experimente · marcas fictícias
          </p>
          <div role="group" aria-labelledby="marca-escolha" className="inline-flex rounded-full border border-line bg-paper p-1">
            {options.map(({ brand: b, swatch }) => {
              const selected = b.id === current
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => choose(b.id)}
                  className={`inline-flex h-10 items-center gap-2.5 rounded-full px-4 text-sm font-semibold transition-colors ${
                    selected ? 'bg-white text-ink shadow-[0_1px_3px_rgb(23_17_31/0.12)]' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <span className="size-3 rounded-full ring-2 ring-white" style={{ background: swatch }} />
                  {b.name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative mt-8 pb-10 sm:pb-0 sm:pr-[12%]" data-reveal>
          <BrowserFrame onLight url="painel · Formaturas" label={`Painel da empresa com a marca ${brand.name}.`}>
            <DashboardMock brand={brand} />
          </BrowserFrame>
          <PhoneFrame
            label={`Portal do formando com a marca ${brand.name}: convites prontos.`}
            className="absolute -bottom-2 right-0 w-[34%] max-w-[260px] sm:-bottom-10 sm:w-[24%]"
          >
            <PortalMock brand={brand} />
          </PhoneFrame>
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          Marca aplicada: {brand.name}.
        </p>
      </Container>
    </section>
  )
}

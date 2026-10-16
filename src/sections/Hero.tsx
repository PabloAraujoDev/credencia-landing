import { Check } from 'lucide-react'
import { cta } from '../content/site'
import { brands } from '../components/mockups/brands'
import { DashboardMock } from '../components/mockups/DashboardMock'
import { BrowserFrame, PhoneFrame } from '../components/mockups/Frames'
import { ScanResult } from '../components/mockups/ScannerScreens'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Pipeline } from '../components/ui/Pipeline'

const facts = ['Sem aplicativo para baixar', 'Com a marca da sua empresa', 'QR Code de uso único']

function Callout({ children, className }: { children: string; className: string }) {
  return (
    <span aria-hidden="true" className={`absolute z-20 hidden items-center whitespace-nowrap gap-2 rounded-full border border-white/15 bg-night-900/85 px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.06em] text-white/80 uppercase shadow-lg backdrop-blur-md xl:inline-flex ${className}`}>
      <span className="size-1.5 rounded-full bg-gold-400" />
      {children}
    </span>
  )
}

export function Hero() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-night-950 text-white">
      {/* Camadas de fundo: grade técnica + luz focal atrás do produto */}
      <div aria-hidden="true" className="bg-grid-dark mask-radial absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute left-1/2 top-[38%] -z-10 h-[680px] w-[1100px] -translate-x-1/2 rounded-full bg-violet-700/35 blur-[140px]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-night-950" />

      <Container className="pt-28 sm:pt-32 lg:pt-36">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-12">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pl-2 pr-4 font-mono text-[0.72rem] tracking-[0.1em] text-white/75 uppercase">
              <span className="rounded-full bg-gold-400/15 px-2 py-0.5 text-gold-300">Plataforma</span>
              Credenciamento de formaturas
            </p>
            <h1 id="hero-title" className="font-display mt-6 max-w-[15ch] text-[clamp(2.7rem,6.6vw,5.6rem)] text-balance">
              Da lista de convidados <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">à porta da festa.</span>
            </h1>
          </div>

          <div className="lg:col-span-6 lg:col-start-1">
            <p className="max-w-[34rem] text-lg leading-relaxed text-white/72 sm:text-xl">
              O formando cadastra os convidados e assina o termo pelo celular. Sua equipe aprova, gera convites com QR Code e confere a entrada na portaria em segundos.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-6 lg:items-end lg:justify-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={cta.primary.href} size="lg" arrow trackAs="hero">
                {cta.primary.label}
              </ButtonLink>
              <ButtonLink href={cta.secondary.href} size="lg" variant="secondary-dark" trackAs="hero-secundario">
                {cta.secondary.label}
              </ButtonLink>
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-12">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/65">
                <Check aria-hidden="true" className="size-4 text-gold-400" strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <Pipeline className="mx-auto mt-14 max-w-3xl lg:mt-12" />

        {/* Composição do produto */}
        <div className="hero-product relative mx-auto mt-12 max-w-[1140px] pb-16 sm:pb-24 lg:mt-12">
          <Callout className="-left-4 top-[30%]">Funil da turma ao vivo</Callout>
          <Callout className="left-[34%] top-[86%]">CPF mascarado</Callout>

          <div className="relative rounded-[18px] bg-gradient-to-b from-white/20 via-white/5 to-transparent p-px">
            <BrowserFrame
              url="painel · Formatura ADS 2026 — Turma A"
              label="Painel da empresa com indicadores da turma, funil de andamento (cadastro enviado, termo assinado, convites gerados) e a lista de formandos com CPF mascarado."
            >
              <DashboardMock brand={brands.alfa} />
            </BrowserFrame>
          </div>

          <div className="absolute -bottom-4 right-[2%] w-[36%] max-w-[250px] sm:right-[5%] sm:w-[23%] lg:-bottom-6">
            <Callout className="right-[calc(100%+14px)] top-[22%]">Portaria · uso único</Callout>
            <PhoneFrame label="Tela da portaria no celular: entrada autorizada, com o nome e o CPF mascarado da formanda para conferir com o documento.">
              <ScanResult status="go" nextLabel="Próximo (4s)" />
            </PhoneFrame>
          </div>
        </div>
      </Container>
    </section>
  )
}

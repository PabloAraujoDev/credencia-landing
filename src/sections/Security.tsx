import { FileCheck2 } from 'lucide-react'
import { securityPoints } from '../content/copy'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'

const receipt = [
  ['Documento', 'Termo de responsabilidade'],
  ['Versão', 'v1 · aditivo nº 1 aceito'],
  ['Assinado por', 'Ana Beatriz Souza'],
  ['CPF', '100.***.***-89'],
  ['Data', '03/11/2026'],
  ['Horário', '19:42:07'],
  ['IP', 'registrado'],
  ['Dispositivo', 'celular · navegador'],
]

/** Registro do aceite: ilustra o que o sistema guarda, com dados fictícios. */
function Receipt() {
  return (
    <figure className="relative" data-reveal>
      <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-night-900 font-mono text-[0.82rem] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="flex items-center gap-2.5 text-white">
            <FileCheck2 aria-hidden="true" className="size-4 text-go-bright" />
            registro_do_aceite
          </span>
          <span className="rounded-full bg-go-bright/12 px-2.5 py-0.5 text-[0.7rem] tracking-[0.06em] text-go-bright uppercase">aceito</span>
        </div>
        <dl className="px-5 py-3">
          {receipt.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3 border-b border-dashed border-white/8 py-2.5 last:border-0">
              <dt className="text-white/60">{k}</dt>
              <dd className="text-white/90">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-white/10 bg-white/[0.03] px-5 py-3.5 text-[0.75rem] text-white/50">PDF guardado exatamente como foi aceito.</div>
      </div>
      <figcaption className="mt-4 text-sm text-white/50">Ilustração com dados fictícios do que fica registrado em cada assinatura.</figcaption>
    </figure>
  )
}

export function Security() {
  return (
    <section id="seguranca" aria-labelledby="seguranca-title" className="relative overflow-hidden bg-night-950 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-violet-700/25 blur-[120px]" />
      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeader
              id="seguranca-title"
              index="06"
              eyebrow="Segurança e privacidade"
              tone="dark"
              title="Desenvolvido com foco em proteção de dados."
              lead="Formatura envolve dados de muita gente, inclusive menores de idade. Por isso o sistema foi construído pensando na LGPD e na segurança dos dados."
            />

            <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {securityPoints.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4" data-reveal>
                  <span className="grid size-10 flex-none place-items-center rounded-xl border border-white/12 bg-white/[0.04] text-gold-300">
                    <Icon aria-hidden="true" className="size-[18px]" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-white/65">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-12 max-w-2xl border-l-2 border-gold-500/60 pl-4 text-sm leading-relaxed text-white/55">
              A adequação à LGPD também depende dos processos e dos textos de cada empresa. Os termos usados no sistema devem ser revisados pelo jurídico do cliente.
            </p>
          </div>

          <div className="lg:col-span-5 lg:pt-28">
            <Receipt />
          </div>
        </div>
      </Container>
    </section>
  )
}

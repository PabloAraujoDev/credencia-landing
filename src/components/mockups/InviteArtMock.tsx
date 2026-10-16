import { CheckCircle2, ImageUp, UserCog } from 'lucide-react'
import type { DemoBrand } from './brands'
import { InvitePoster } from './PortalMock'

/**
 * Arte do convite (briefing §5): a empresa envia a arte uma vez e o sistema
 * compõe cada convite com o QR Code e os dados nas posições padronizadas.
 */
export function InviteArtMock({ brand }: { brand: DemoBrand }) {
  return (
    <div className={`grid grid-cols-[0.75fr_1.25fr] items-start gap-[1.4em] bg-[#f6f5f8] p-[1.4em] text-[1.3em] ${brand.className}`}>
      {/* Arte com as áreas reservadas */}
      <div>
        <span className="mk-label">Arte enviada</span>
        <div className="relative mt-[0.6em]">
          <InvitePoster seed={21} className="w-full" />
          <span className="absolute inset-x-[22%] bottom-[7%] top-[52%] rounded-[0.3em] border-[1.5px] border-dashed border-[var(--brand)] bg-[var(--brand-soft)]/40" />
          <span className="absolute bottom-[8.5%] left-1/2 -translate-x-1/2 translate-y-[140%] whitespace-nowrap rounded-full bg-[var(--brand)] px-[0.7em] py-[0.15em] text-[0.62em] font-semibold text-white">
            Área do QR Code
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[0.9em]">
        <div className="mk-card p-[1em]">
          <div className="mk-row text-[0.85em] font-semibold">
            <ImageUp className="size-[1.2em] text-[var(--brand)]" />
            convite-ads-2026.png
            <CheckCircle2 className="ml-auto size-[1.2em] text-[#1c8a55]" />
          </div>
          <div className="mk-list-item">
            <span className="mk-muted">Posição do QR Code</span>
            <span className="ml-auto font-semibold">Padrão</span>
          </div>
          <div className="mk-list-item">
            <span className="mk-muted">Dados no convite</span>
            <span className="ml-auto font-semibold">Nome · tipo</span>
          </div>
        </div>

        <div className="mk-card p-[1em]">
          <div className="flex items-center justify-between">
            <span className="mk-label">Convites gerados</span>
            <span className="mk-chip green">4 prontos</span>
          </div>
          <div className="mt-[0.8em] grid grid-cols-4 gap-[0.5em]">
            {[3, 11, 17, 29].map((seed) => (
              <InvitePoster key={seed} seed={seed} />
            ))}
          </div>
        </div>

        <div className="mk-card p-[1em]">
          <div className="mk-row text-[0.85em] font-semibold">
            <UserCog className="size-[1.2em] text-[var(--brand)]" />
            Operadores de portaria
          </div>
          {[
            ['Marcos · Portaria 1', 'Turma A'],
            ['Juliana · Portaria 2', 'Turma A, B'],
          ].map(([who, scope]) => (
            <div key={who} className="mk-list-item">
              {who}
              <span className="mk-chip gray ml-auto">{scope}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Check, Download, Share, Ticket } from 'lucide-react'
import { StatusBar } from './Frames'
import { QrPattern } from './QrPattern'
import type { DemoBrand } from './brands'

export function AppBar({ brand }: { brand: DemoBrand }) {
  const Icon = brand.icon
  return (
    <>
      <div className="bg-white">
        <StatusBar />
      </div>
      <div className="mk-appbar">
        <span className="mk-appbar-logo">
          <Icon />
        </span>
        {brand.name}
      </div>
    </>
  )
}

/** Arte do convite composta pelo sistema: arte da empresa + QR + dados. */
export function InvitePoster({ seed, className = '' }: { seed: number; className?: string }) {
  return (
    <div className={`mk-poster ${className}`}>
      <div className="mk-poster-top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
        <span>CONVITE</span>
      </div>
      <div className="mk-poster-body">
        <i style={{ width: '70%' }} />
        <i style={{ width: '50%' }} />
        <QrPattern seed={seed} />
      </div>
    </div>
  )
}

const invites = [
  { name: 'Eduardo Nunes Pacheco', role: 'Formando(a) · 1 entrada', seed: 3 },
  { name: 'Maria Silva Souza', role: 'Convidado(a) · 1 entrada', seed: 11 },
]

/** Portal do formando — convites prontos (captura do briefing §6). */
export function PortalMock({ brand }: { brand: DemoBrand }) {
  return (
    <div className={`h-full bg-[#f5f4f2] ${brand.className}`}>
      <AppBar brand={brand} />
      <div className="mk-pad">
        <div className="mk-now">
          <span className="mk-now-icon">
            <Ticket />
          </span>
          <div>
            <small>AGORA</small>
            <strong>Baixe e envie os convites</strong>
            <p>Salve cada convite no celular e envie a cada convidado.</p>
          </div>
        </div>

        <div className="mk-done">
          <span className="mk-done-icon">
            <Check />
          </span>
          Termo assinado!
        </div>

        <div className="mk-notice">
          <strong>2 convites prontos</strong>
          Cada convite dá direito a uma entrada, sem reentrada.
        </div>

        {invites.map((inv) => (
          <div key={inv.name} className="mk-invite">
            <InvitePoster seed={inv.seed} />
            <div>
              <div className="mk-invite-name">{inv.name}</div>
              <div className="mk-invite-role">{inv.role}</div>
              <div className="mk-invite-actions">
                <span className="mk-btn">
                  <Download className="size-[1.1em]" /> Baixar
                </span>
                <span className="mk-btn is-brand">
                  <Share className="size-[1.1em]" /> Enviar
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

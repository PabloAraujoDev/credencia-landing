import { Check, X } from 'lucide-react'
import { StatusBar } from './Frames'
import { QrPattern } from './QrPattern'

export interface ScanPerson {
  name: string
  cpf: string
  role: string
}

export const demoPerson: ScanPerson = { name: 'Ana Beatriz Souza', cpf: '100.***.***-89', role: 'Formando(a)' }

/** Resultado em tela cheia da portaria (captura do briefing §6). */
export function ScanResult({
  status,
  person = demoPerson,
  firstEntry = '21:14:03',
  nextLabel = 'Próximo',
}: {
  status: 'go' | 'stop'
  person?: ScanPerson
  firstEntry?: string
  nextLabel?: string
}) {
  const go = status === 'go'
  return (
    <div className={`mk-scan-result ${go ? 'is-go' : 'is-stop'}`}>
      <div className="absolute inset-x-0 top-0">
        <StatusBar tone="light" />
      </div>
      <div className="mk-scan-main">
        <span className="mk-scan-icon">{go ? <Check /> : <X />}</span>
        <span className="mk-scan-title">{go ? 'AUTORIZADO' : 'NEGADO'}</span>
        <span className="mk-scan-sub">{go ? 'Entrada liberada' : 'Convite já utilizado'}</span>
        <div className="mk-scan-card">
          {go ? (
            <>
              <small>CONFIRA COM O DOCUMENTO</small>
              <strong>{person.name}</strong>
              <span className="mk-mono">{person.cpf}</span>
              <hr />
              <p>{person.role}</p>
            </>
          ) : (
            <>
              <small>PRIMEIRA ENTRADA ÀS</small>
              <strong className="mk-mono">{firstEntry}</strong>
              <hr />
              <p>
                {person.name} · {person.role}
              </p>
            </>
          )}
        </div>
      </div>
      <span className="mk-scan-next">{nextLabel}</span>
    </div>
  )
}

export function CameraView({ count, scanning, seed = 5 }: { count: number; scanning: boolean; seed?: number }) {
  return (
    <div className={`mk-camera ${scanning ? 'is-scanning' : ''}`}>
      <div className="absolute inset-x-0 top-0">
        <StatusBar tone="light" />
      </div>
      <div className="mk-camera-head">
        <b>Portaria · Turma A</b>
        <span className="mk-camera-count">
          {count} {count === 1 ? 'entrada' : 'entradas'}
        </span>
      </div>
      <div className="mk-viewfinder">
        <div className="mk-viewfinder-qr">
          <QrPattern seed={seed} />
        </div>
        <span className="mk-scanline" />
      </div>
      <div className="mk-camera-hint">Aponte a câmera para o QR Code do convite</div>
    </div>
  )
}

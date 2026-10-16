import { useEffect, useRef, useState } from 'react'
import { RotateCcw, ScanLine } from 'lucide-react'
import { track } from '../lib/analytics'
import { PhoneFrame } from './mockups/Frames'
import { CameraView, ScanResult, demoPerson } from './mockups/ScannerScreens'
import { Button } from './ui/Button'

type View = 'camera' | 'scanning' | 'go' | 'stop'

interface LogEntry {
  time: string
  result: 'go' | 'stop'
}

const now = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

/**
 * Demonstração do QR Code de uso único: a primeira leitura autoriza,
 * a segunda do mesmo convite é negada com o horário da primeira entrada.
 */
export function ScannerSimulator() {
  const [view, setView] = useState<View>('camera')
  const [firstEntry, setFirstEntry] = useState<string | null>(null)
  const [log, setLog] = useState<LogEntry[]>([])
  const [announcement, setAnnouncement] = useState('')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const scan = () => {
    if (view === 'scanning') return
    if (view === 'go' || view === 'stop') {
      setView('camera')
      setAnnouncement('Câmera pronta para a próxima leitura.')
      return
    }
    setView('scanning')
    setAnnouncement('Lendo o QR Code…')
    track('scanner_demo', { leitura: firstEntry ? 'repetida' : 'primeira' })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current = window.setTimeout(
      () => {
        const time = now()
        if (!firstEntry) {
          setFirstEntry(time)
          setView('go')
          setLog((l) => [{ time, result: 'go' }, ...l])
          setAnnouncement(`Autorizado. Entrada liberada para ${demoPerson.name}.`)
        } else {
          setView('stop')
          setLog((l) => [{ time, result: 'stop' }, ...l])
          setAnnouncement(`Negado. Convite já utilizado, primeira entrada às ${firstEntry}.`)
        }
      },
      reduced ? 250 : 1100,
    )
  }

  const reset = () => {
    window.clearTimeout(timer.current)
    setView('camera')
    setFirstEntry(null)
    setLog([])
    setAnnouncement('Demonstração reiniciada.')
  }

  const count = log.filter((l) => l.result === 'go').length
  const showResult = view === 'go' || view === 'stop'

  const label =
    view === 'scanning' ? 'Lendo…' : showResult ? 'Voltar para a câmera' : firstEntry ? 'Ler o mesmo convite de novo' : 'Ler o QR Code do convite'

  return (
    // Celular: texto → aparelho → botões → registro (o resultado fica sempre perto do botão).
    // Desktop: aparelho à esquerda, o resto à direita.
    <div className="grid gap-x-12 gap-y-6 sm:grid-cols-[minmax(0,260px)_1fr] sm:grid-rows-[auto_auto_1fr] sm:items-start">
      <div className="sm:col-start-2 sm:row-start-1 sm:pt-6">
        <p className="eyebrow text-gold-400">Teste agora</p>
        <p className="mt-3 text-lg font-semibold text-white">Leia o convite duas vezes.</p>
        <p className="mt-2 text-white/65">A primeira leitura libera a entrada. A segunda, do mesmo convite, é negada na hora.</p>
      </div>

      <PhoneFrame
        label="Simulação da tela da portaria lendo o QR Code de um convite."
        className="mx-auto w-[min(240px,64vw)] sm:col-start-1 sm:row-span-3 sm:row-start-1 sm:w-full"
      >
        <CameraView count={count} scanning={view === 'scanning'} />
        <div className={`absolute inset-0 transition-opacity duration-300 ${showResult ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          {view === 'stop' ? <ScanResult status="stop" firstEntry={firstEntry ?? ''} /> : <ScanResult status="go" />}
        </div>
      </PhoneFrame>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:col-start-2 sm:row-start-2 sm:justify-start">
        <Button onClick={scan} disabled={view === 'scanning'} aria-describedby="scanner-status">
          <ScanLine aria-hidden="true" className="size-4" />
          {label}
        </Button>
        {log.length > 0 && (
          <button type="button" onClick={reset} className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white">
            <RotateCcw aria-hidden="true" className="size-4" />
            Reiniciar
          </button>
        )}
        <p id="scanner-status" role="status" aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-night-950/60 font-mono text-[0.78rem] sm:col-start-2 sm:row-start-3">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-white/60">
          <span>registro de leituras</span>
          <span>
            {count} {count === 1 ? 'entrada' : 'entradas'}
          </span>
        </div>
        <ul className="max-h-[132px] min-h-[88px] overflow-hidden px-4 py-2.5">
          {log.length === 0 && <li className="py-1 text-white/60">Nenhuma leitura ainda.</li>}
          {log.slice(0, 4).map((entry, i) => (
            <li key={`${entry.time}-${i}`} className="flex items-center gap-3 py-1 text-white/75">
              <span className="text-white/60">{entry.time}</span>
              <span className={entry.result === 'go' ? 'text-go-bright' : 'text-stop-bright'}>{entry.result === 'go' ? 'AUTORIZADO' : 'NEGADO'}</span>
              <span className="truncate text-white/60">{entry.result === 'go' ? demoPerson.name : 'convite já utilizado'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

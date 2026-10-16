import type { ReactNode } from 'react'
import { Lock } from 'lucide-react'

interface FrameProps {
  children: ReactNode
  className?: string
  /** Descrição da tela para leitores de tela; o conteúdo interno é decorativo. */
  label: string
}

export function BrowserFrame({ children, className = '', label, url, onLight }: FrameProps & { url: string; onLight?: boolean }) {
  return (
    <div role="img" aria-label={label} className={`mk-browser ${onLight ? 'on-light' : ''} ${className}`}>
      <div className="mk" aria-hidden="true">
        <div className="mk-browser-bar">
          <i />
          <i />
          <i />
          <span className="mk-url">
            <Lock className="size-[0.9em]" strokeWidth={2.4} />
            {url}
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}

export function PhoneFrame({ children, className = '', label, screenClassName = '' }: FrameProps & { screenClassName?: string }) {
  return (
    <div role="img" aria-label={label} className={`mk-phone ${className}`}>
      <div className={`mk mk-phone-screen ${screenClassName}`} aria-hidden="true">
        {children}
      </div>
    </div>
  )
}

export function StatusBar({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <div className="mk-statusbar" style={{ color: tone === 'light' ? '#fff' : '#1f1a26' }}>
      <span>21:14</span>
      <span className="flex items-center gap-[0.3em]">
        <svg viewBox="0 0 18 12" className="h-[0.8em] w-auto" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-[0.8em] w-auto" fill="none" stroke="currentColor">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" />
          <rect x="2.5" y="2.5" width="15" height="7" rx="1.5" fill="currentColor" stroke="none" />
          <path d="M24.5 4v4" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  )
}

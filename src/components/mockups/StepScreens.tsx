import { CircleAlert, MessageCircle, Plus, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { brands } from './brands'
import { AppBar } from './PortalMock'
import { PortalMock } from './PortalMock'
import { ScanResult } from './ScannerScreens'

const brand = brands.alfa

/* Janela do painel (passos da empresa) */
function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={`mk-window ${brand.className}`}>
      <div className="mk-window-bar">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <div className="p-[1.2em]">{children}</div>
    </div>
  )
}

/* Tela de celular (passos do formando e da portaria) */
function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="mk-phone mx-auto w-[46%]">
      <div className="mk mk-phone-screen">{children}</div>
    </div>
  )
}

function Field({ label, value, focus }: { label: string; value: string; focus?: boolean }) {
  return (
    <div className="mk-field">
      <span className="mk-label">{label}</span>
      <div className={`mk-input ${focus ? 'is-focus' : ''}`}>{value}</div>
    </div>
  )
}

function StepCadastro() {
  return (
    <Window title="Nova formatura">
      <Field label="Nome da formatura" value="Formatura ADS 2026 — Turma A" focus />
      <div className="grid grid-cols-2 gap-[0.8em]">
        <Field label="Data" value="03/01/2027" />
        <Field label="Convidados por formando" value="15" />
      </div>
      <Field label="Local" value="Espaço Villa Real" />
      <div className="mt-[1em] flex items-center justify-between">
        <span className="mk-label">Formandos · 4</span>
        <span className="mk-link text-[0.8em]">+ Importar</span>
      </div>
      {['Ana Beatriz Souza', 'Carlos Eduardo Lima', 'Daniela Martins Reis'].map((n) => (
        <div key={n} className="mk-list-item">
          <span className="mk-avatar">{n[0]}</span>
          {n}
        </div>
      ))}
      <div className="mt-[0.9em] flex justify-end">
        <span className="mk-btn is-brand">Salvar formatura</span>
      </div>
    </Window>
  )
}

function StepLink() {
  return (
    <Window title="Enviar link · Ana Beatriz Souza">
      <span className="mk-label">Mensagem pronta</span>
      <div className="mk-bubble">
        Olá, Ana! Aqui é a equipe da {brand.name}. Este é o seu link pessoal para cadastrar os convidados da Formatura ADS 2026 — Turma A:
        <br />
        <u>link pessoal de acesso</u>
        <time>21:02</time>
      </div>
      <p className="mk-muted mt-[0.9em] text-[0.78em]">O WhatsApp abre com a mensagem e o link prontos. É só enviar.</p>
      <div className="mt-[0.9em] flex justify-end gap-[0.5em]">
        <span className="mk-btn">Copiar link</span>
        <span className="mk-btn mk-wa">
          <MessageCircle className="size-[1.1em]" /> Abrir WhatsApp
        </span>
      </div>
    </Window>
  )
}

function StepFormando() {
  return (
    <Phone>
      <div className={`h-full bg-[#f5f4f2] ${brand.className}`}>
        <AppBar brand={brand} />
        <div className="mk-pad">
          <div className="flex items-baseline justify-between">
            <strong className="text-[1.05em]">Seus convidados</strong>
            <span className="mk-mono mk-muted text-[0.8em]">3/15</span>
          </div>
          <div className="mk-bar">
            <i style={{ width: '20%', background: 'var(--brand)' }} />
          </div>
          <div className="mt-[0.6em] rounded-[0.8em] border border-[#e9e6ed] bg-white px-[0.8em]">
            {['Maria Silva Souza', 'João Pedro Souza', 'Helena Souza'].map((n, i) => (
              <div key={n} className="mk-list-item" style={i === 0 ? { borderTop: 0 } : undefined}>
                <UserRound className="size-[1.1em] text-[#6b6577]" />
                {n}
              </div>
            ))}
          </div>
          <div className="mt-[0.6em] flex items-center justify-center gap-[0.4em] rounded-[0.8em] border-[1.5px] border-dashed border-[#cfc8d9] py-[0.7em] text-[0.8em] font-semibold text-[var(--brand)]">
            <Plus className="size-[1.1em]" /> Adicionar convidado
          </div>
          <div className="mt-[1em]">
            <span className="mk-btn is-brand is-block">Enviar para análise</span>
          </div>
        </div>
      </div>
    </Phone>
  )
}

function StepAnalise() {
  return (
    <Window title="Análise · Carlos Eduardo Lima">
      <div className="flex items-center justify-between">
        <span className="mk-label">Lista enviada · 2 convidados</span>
        <span className="mk-chip amber">Aguardando análise</span>
      </div>
      <div className="mk-list-item mt-[0.4em]">
        <span className="mk-avatar">R</span>
        Ricardo Lima <span className="mk-mono mk-muted ml-auto text-[0.9em]">CPF incompleto</span>
        <CircleAlert className="size-[1.1em] text-[#b07508]" />
      </div>
      <div className="mk-list-item">
        <span className="mk-avatar">S</span>
        Sofia Lima <span className="mk-mono mk-muted ml-auto text-[0.9em]">100.***.***-42</span>
      </div>
      <div className="mk-field">
        <span className="mk-label">Pendência para o formando</span>
        <div className="mk-textarea">Informe o CPF completo de Ricardo Lima.</div>
      </div>
      <div className="mt-[1em] flex justify-end gap-[0.5em]">
        <span className="mk-btn">Devolver com pendência</span>
        <span className="mk-btn is-brand">Aprovar lista</span>
      </div>
    </Window>
  )
}

/** Conteúdo da tela de assinatura do termo — reutilizado em "Para quem usa". */
export function SignatureContent() {
  return (
      <div className={`h-full bg-[#f5f4f2] ${brand.className}`}>
        <AppBar brand={brand} />
        <div className="mk-pad">
          <strong className="text-[1.05em]">Termo de responsabilidade</strong>
          <p className="mk-muted mt-[0.2em] text-[0.72em]">Leia com atenção antes de assinar.</p>
          <div className="mk-term-lines mt-[0.9em]">
            {[100, 94, 98, 86, 100, 72, 96, 60].map((w, i) => (
              <i key={i} style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mk-sign">
            <svg viewBox="0 0 220 70" fill="none">
              <path
                d="M8 52c14-30 26-44 32-38 7 8-14 38-6 40 8 2 18-34 28-32 8 2-2 26 6 26 9 0 14-22 22-20 7 2 0 18 8 18s14-14 22-14 6 12 14 12 16-8 26-10 28-2 40-4"
                stroke="var(--brand)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Assine com o dedo</span>
          </div>
          <p className="mk-muted mt-[0.7em] text-[0.66em]">Data, horário, IP e dispositivo ficam registrados no aceite.</p>
          <div className="mt-[0.8em]">
            <span className="mk-btn is-brand is-block">Assinar termo</span>
          </div>
        </div>
      </div>
  )
}

function StepAssinatura() {
  return (
    <Phone>
      <SignatureContent />
    </Phone>
  )
}

function StepConvites() {
  return (
    <Phone>
      <PortalMock brand={brand} />
    </Phone>
  )
}

function StepPortaria() {
  return (
    <Phone>
      <ScanResult status="go" />
    </Phone>
  )
}

export const stepScreens = [StepCadastro, StepLink, StepFormando, StepAnalise, StepAssinatura, StepConvites, StepPortaria]

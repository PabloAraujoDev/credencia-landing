import { GraduationCap, IdCard, Search, Settings } from 'lucide-react'
import type { DemoBrand } from './brands'

const rows = [
  { i: 'A', name: 'Ana Beatriz Souza', cpf: '100.***.***-89', wa: '+55 11 99999-1000', guests: 3, status: 'Convites enviados', tone: 'green', action: 'Abrir' },
  { i: 'C', name: 'Carlos Eduardo Lima', cpf: '100.***.***-16', wa: '+55 11 99999-1001', guests: 2, status: 'Aguardando análise', tone: 'amber', action: 'Analisar' },
  { i: 'D', name: 'Daniela Martins Reis', cpf: '100.***.***-53', wa: '+55 11 99999-1002', guests: 1, status: 'Preenchendo', tone: 'blue', action: 'Abrir' },
  { i: 'E', name: 'Eduardo Nunes Pacheco', cpf: '100.***.***-90', wa: '+55 11 99999-1003', guests: 0, status: 'Cadastrado', tone: 'gray', action: 'Abrir' },
]

const kpis = [
  ['Formandos', '4', ''],
  ['Na análise', '1', 'amber'],
  ['Assinados', '1', 'green'],
  ['Convidados', '6', ''],
  ['Convites', '4', ''],
  ['Entraram', '0', ''],
] as const

const funnel = [
  { label: '1. Cadastro enviado', value: '2/4 · 50%', pct: 50, color: '#3b6fe0' },
  { label: '2. Termo assinado', value: '1/4 · 25%', pct: 25, color: '#1c8a55' },
  { label: '3. Convites gerados', value: '1/4 · 25%', pct: 25, color: '#e8772e' },
]

const filters = [
  ['Todos', 4],
  ['Cadastro pendente', 2],
  ['Na análise', 1],
  ['Ajustes pedidos', 0],
  ['Aprovados', 0],
  ['Assinados', 1],
] as const

/** Painel da empresa — recriação da captura do briefing (§6), com dados fictícios. */
export function DashboardMock({ brand }: { brand: DemoBrand }) {
  const BrandIcon = brand.icon
  return (
    <div className={`mk-dash ${brand.className}`}>
      <aside className="mk-side">
        <div className="mk-side-brand">
          <BrandIcon />
          {brand.name}
        </div>
        <div className="mk-side-item is-active">
          <GraduationCap /> Formaturas
        </div>
        <div className="mk-side-item">
          <IdCard /> Credenciamento
        </div>
        <div className="mk-side-item">
          <Settings /> Configurações
        </div>
      </aside>

      <div className="mk-main">
        <div className="mk-crumb">
          <b>Formaturas</b> &nbsp;/&nbsp; Formatura ADS 2026 — Turma A
        </div>
        <div className="mk-head">
          <div>
            <div className="mk-h1">Formatura ADS 2026 — Turma A</div>
            <div className="mk-sub">03/01/2027 · Espaço Villa Real · até 15 convidados por formando</div>
          </div>
          <div className="mk-actions">
            <span className="mk-btn">Arte do convite</span>
            <span className="mk-btn is-brand">Novo formando</span>
          </div>
        </div>

        <div className="mk-kpis">
          {kpis.map(([label, value, tone]) => (
            <div key={label} className={`mk-kpi ${tone}`}>
              <span className="mk-label">{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="mk-card mk-funnel">
          <span className="mk-label">Andamento da turma</span>
          <div className="mk-funnel-row">
            {funnel.map((f) => (
              <div key={f.label} className="mk-funnel-item">
                <div>
                  {f.label} <span>{f.value}</span>
                </div>
                <div className="mk-bar">
                  <i style={{ width: `${f.pct}%`, background: f.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mk-toolbar">
          <div className="mk-search">
            <Search /> Buscar formando pelo nome <span className="mk-kbd">/</span>
          </div>
          <span className="mk-btn">Ordenar: Nome (A–Z)</span>
        </div>
        <div className="mk-filters">
          {filters.map(([label, n], idx) => (
            <span key={label} className={`mk-filter ${idx === 0 ? 'is-active' : ''}`}>
              {label} <b>{n}</b>
            </span>
          ))}
        </div>

        <div className="mk-card mk-table">
          <div className="mk-tr is-head">
            <span>Formando</span>
            <span>CPF</span>
            <span>WhatsApp</span>
            <span>Convidados</span>
            <span>Status</span>
            <span />
          </div>
          {rows.map((r) => (
            <div key={r.name} className="mk-tr">
              <span className="mk-who">
                <span className="mk-avatar">{r.i}</span>
                {r.name}
              </span>
              <span className="mk-mono mk-muted">{r.cpf}</span>
              <span className="mk-mono mk-muted">{r.wa}</span>
              <span className="mk-progress">
                {r.guests}/15
                <span className="mk-bar">
                  <i style={{ width: `${(r.guests / 15) * 100}%`, background: 'var(--brand)' }} />
                </span>
              </span>
              <span>
                <span className={`mk-chip ${r.tone}`}>{r.status}</span>
              </span>
              <span className="mk-link">{r.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

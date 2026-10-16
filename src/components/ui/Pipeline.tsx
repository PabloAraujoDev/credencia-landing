const stages = ['Cadastro', 'Análise', 'Termo', 'Convite', 'Portaria'] as const

/**
 * O "fio" do conceito em linguagem SaaS: um pipeline de status que liga
 * o cadastro da turma à porta da festa. O pulso dourado mostra o fluxo.
 */
export function Pipeline({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="sr-only">Etapas da plataforma: {stages.join(', ')}.</p>
      <ol aria-hidden="true" className="relative grid grid-cols-5">
        <span className="absolute left-[10%] right-[10%] top-[11px] h-px overflow-hidden bg-gradient-to-r from-gold-500/30 via-gold-500/60 to-gold-500/30">
          <span className="pipeline-pulse absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
        </span>
        {stages.map((stage, i) => (
          <li key={stage} className="relative flex flex-col items-center gap-3">
            <span
              className={`relative grid size-[23px] place-items-center rounded-full border bg-night-950 ${
                i === stages.length - 1 ? 'pulse-ring border-gold-400' : 'border-gold-500/50'
              }`}
            >
              <span className={`size-[7px] rounded-full ${i === stages.length - 1 ? 'bg-gold-300' : 'bg-gold-500/80'}`} />
            </span>
            <span className="font-mono text-[0.6rem] tracking-[0.02em] text-white/60 uppercase sm:text-xs sm:tracking-[0.08em]">{stage}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

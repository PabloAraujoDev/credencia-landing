import { GraduationCap, Sparkles, type LucideIcon } from 'lucide-react'

/** Marcas fictícias usadas nas demonstrações (briefing §6: "Alfa Formaturas"). */
export interface DemoBrand {
  id: 'alfa' | 'lume'
  name: string
  className: string
  icon: LucideIcon
}

export const brands: Record<DemoBrand['id'], DemoBrand> = {
  alfa: { id: 'alfa', name: 'Alfa Formaturas', className: 'mk-brand-alfa', icon: GraduationCap },
  lume: { id: 'lume', name: 'Lume Eventos', className: 'mk-brand-lume', icon: Sparkles },
}

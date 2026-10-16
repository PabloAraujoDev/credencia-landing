import { useEffect, useState, type RefObject } from 'react'

/**
 * Retorna o índice do item (filhos com [data-index]) que cruza a faixa
 * central da tela. Usado na linha do tempo com tela fixa.
 */
export function useActiveIndex(containerRef: RefObject<HTMLElement | null>, selector = '[data-index]'): number {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !('IntersectionObserver' in window)) return
    const items = Array.from(container.querySelectorAll<HTMLElement>(selector))
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [containerRef, selector])

  return active
}

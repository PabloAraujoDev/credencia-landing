/**
 * Revela elementos marcados com [data-reveal] quando entram na tela.
 * Um único observer para a página inteira; sem JS, tudo fica visível.
 */
export function initReveal(root: ParentNode = document): () => void {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'))
    return () => {}
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  )
  items.forEach((el) => io.observe(el))
  return () => io.disconnect()
}

import { useMemo } from 'react'

const SIZE = 25

/** Padrão visual de QR Code (ilustrativo, não decodificável), determinístico por semente. */
export function QrPattern({ seed = 7, className = '', color = '#17111f' }: { seed?: number; className?: string; color?: string }) {
  const path = useMemo(() => {
    let s = seed * 9301 + 49297
    const rand = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x >= SIZE - 8 && y < 8) || (x < 8 && y >= SIZE - 8)
    let d = ''
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (inFinder(x, y)) continue
        if (rand() > 0.52) d += `M${x} ${y}h1v1h-1z`
      }
    }
    for (const [fx, fy] of [
      [0, 0],
      [SIZE - 7, 0],
      [0, SIZE - 7],
    ]) {
      d += `M${fx} ${fy}h7v7h-7zM${fx + 1} ${fy + 1}v5h5v-5zM${fx + 2} ${fy + 2}h3v3h-3z`
    }
    return d
  }, [seed])

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={className} shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      <path d={path} fill={color} fillRule="evenodd" />
    </svg>
  )
}

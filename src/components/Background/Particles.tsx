import { LEAF_COUNT_DESKTOP, LEAF_COUNT_MOBILE } from '../../shared/constants'
import styles from './Particles.module.css'

const PARTICLE_ICONS = [
  '/src/shared/assets/slots/7slot.png',
  '/src/shared/assets/slots/cheryslot.png',
  '/src/shared/assets/slots/lemonslot.png',
  '/src/shared/assets/slots/crownslot.png',
  '/src/shared/assets/slots/crystallslot.png',
  '/src/shared/assets/bg_icons/coin_smile.png',
  '/src/shared/assets/bg_icons/coin_arrows.png',
]

interface ParticleConfig {
  id: number
  src: string
  style: React.CSSProperties
  animationClass: string
}

function buildParticles(count: number): ParticleConfig[] {
  return Array.from({ length: count }, (_, i) => {
    const src = PARTICLE_ICONS[i % PARTICLE_ICONS.length]
    const startX = Math.random() * 100          // % from left
    const duration = 8 + Math.random() * 10     // 8–18s
    const delay = -(Math.random() * 15)         // stagger via negative delay
    const size = 32 + Math.random() * 28        // 32–60px
    const driftX = (Math.random() - 0.5) * 120 // drift left/right during fall

    return {
      id: i,
      src,
      animationClass: styles.particle,
      style: {
        left: `${startX}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        '--drift-x': `${driftX}px`,
      } as React.CSSProperties,
    }
  })
}

// Build once — stable across re-renders (not inside component)
const DESKTOP_PARTICLES = buildParticles(LEAF_COUNT_DESKTOP)
const MOBILE_PARTICLES = buildParticles(LEAF_COUNT_MOBILE)

export function Particles() {
  return (
    <div className={styles.root} aria-hidden="true">
      {/* Desktop particles */}
      <div className={styles.desktopOnly}>
        {DESKTOP_PARTICLES.map((p) => (
          <img
            key={p.id}
            src={p.src}
            alt=""
            className={p.animationClass}
            style={p.style}
          />
        ))}
      </div>

      {/* Mobile particles (fewer) */}
      <div className={styles.mobileOnly}>
        {MOBILE_PARTICLES.map((p) => (
          <img
            key={p.id}
            src={p.src}
            alt=""
            className={p.animationClass}
            style={p.style}
          />
        ))}
      </div>
    </div>
  )
}
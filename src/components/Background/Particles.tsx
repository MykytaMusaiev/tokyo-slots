import { LEAF_COUNT_DESKTOP, LEAF_COUNT_MOBILE } from '../../shared/constants'
import { buildParticles } from '../../shared/utils/buildParticles'
import styles from './Particles.module.css'

// Build once — stable across re-renders
const DESKTOP_PARTICLES = buildParticles(LEAF_COUNT_DESKTOP)
const MOBILE_PARTICLES = buildParticles(LEAF_COUNT_MOBILE)

export function Particles() {
  return (
    <div className={styles.root} aria-hidden="true">

      <div className={styles.desktopOnly}>
        {DESKTOP_PARTICLES.map((p) => (
          <img
            key={p.id}
            src={p.src}
            alt=""
            className={styles.particle}
            style={{
              left: `${p.startX}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift-x": `${p.driftX}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className={styles.mobileOnly}>
        {MOBILE_PARTICLES.map((p) => (
          <img
            key={p.id}
            src={p.src}
            alt=""
            className={styles.particle}
            style={{
              left: `${p.startX}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift-x": `${p.driftX}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

    </div>
  )
}
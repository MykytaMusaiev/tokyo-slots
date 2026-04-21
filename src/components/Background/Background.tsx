import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../../shared/store/gameStore'
import { selectGameState } from '../../shared/store/gameStore'
import { GameState } from '../../shared/types'
import styles from './Background.module.css'
import { BG_TRANSITION_DURATION_S } from '../../shared/constants'
import { Particles } from './Particles'

const BG_COLORS: Record<GameState, string> = {
  [GameState.Idle]: '#DAF3A6',
  [GameState.Spinning]: '#DAF3A6',
  [GameState.Win]: '#A5DFF7',
  [GameState.Lose]: '#BA562B',
}

const OVERLAY_COLORS: Record<GameState, string | null> = {
  [GameState.Idle]: null,
  [GameState.Spinning]: null,
  [GameState.Win]: 'rgba(165, 223, 247, 0.55)',
  [GameState.Lose]: 'rgba(186, 86, 43, 0.55)',
}

export function Background() {
  const gameState = useGameStore(selectGameState)

  const bgColor = BG_COLORS[gameState]
  const overlayColor = OVERLAY_COLORS[gameState]

  return (
    <div className={styles.root}>
      {/* Base background color */}
      <div className={styles.headerStrip}>
        <img
          src="/src/shared/assets/images/header.png"
          alt=""
          className={styles.headerImg}
          aria-hidden="true"
        />
      </div>
      <motion.div
        className={styles.bgColor}
        animate={{ backgroundColor: bgColor }}
        transition={{ duration: BG_TRANSITION_DURATION_S }}
      />

      {/* Win / Lose color overlay */}
      <AnimatePresence>
        {overlayColor && (
          <motion.div
            key={gameState}
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: BG_TRANSITION_DURATION_S }}
            style={{ backgroundColor: overlayColor }}
          />
        )}
      </AnimatePresence>

      {/* Sunburst — win state only */}
      <AnimatePresence>
        {gameState === GameState.Win && (
          <motion.div
            key="sunburst"
            className={styles.sunburst}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.35, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: BG_TRANSITION_DURATION_S },
              rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating particles (always visible) */}
      <Particles />

      {/* Tokyo city silhouette */}
      <div className={styles.cityLayer}>
        <img
          src="/src/shared/assets/images/tokiocity.png"
          alt=""
          className={styles.city}
          aria-hidden="true"
        />
      </div>

      {/* Clouds */}
      <div className={styles.cloudsLayer}>
        <img
          src="/src/shared/assets/images/clouds.png"
          alt=""
          className={styles.clouds}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
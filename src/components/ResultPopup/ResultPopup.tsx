import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore, selectGameState, selectLastResult, selectBet } from '../../shared/store/gameStore'
import { GameState } from '../../shared/types'

import { POPUP_AUTO_DISMISS_MS, BG_TRANSITION_DURATION_S } from '../../shared/constants/game'
import winBoardImg from '../../shared/assets/images/win_board.svg'
import loseBoardImg from '../../shared/assets/images/lose_board.svg'
import betSymbolImg from '../../shared/assets/bet/bet_symbol.png'
import styles from './ResultPopup.module.css'

const OVERLAY_COLORS: Partial<Record<GameState, string>> = {
  [GameState.Win]: 'rgba(165, 223, 247, 0.55)',
  [GameState.Lose]: 'rgba(186, 86, 43, 0.55)',
}

const WIN_ANIMATION = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { type: 'spring', stiffness: 300, damping: 18 },
} as const

const LOSE_ANIMATION = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { type: 'tween', duration: 0.2, ease: 'easeOut' },
} as const

function formatAmount(value: number): { whole: string; cents: string } {
  const fixed = Math.abs(value).toFixed(2)
  const [wholePart, centsPart] = fixed.split('.')
  const whole = Number(wholePart)
    .toLocaleString('en-US', { useGrouping: true })
    .replace(/,/g, ' ')
  return { whole, cents: centsPart }
}

export function ResultPopup() {
  const gameState = useGameStore(selectGameState)
  const lastResult = useGameStore(selectLastResult)
  const bet = useGameStore(selectBet)
  const resetToIdle = useGameStore((s) => s.resetToIdle)

  const isWin = gameState === GameState.Win
  const isLose = gameState === GameState.Lose
  const isVisible = isWin || isLose

  const overlayColor = OVERLAY_COLORS[gameState] ?? null
  const anim = isWin ? WIN_ANIMATION : LOSE_ANIMATION

  // Win: show payout. Lose: show bet (amount deducted from balance)
  const displayAmount = isWin ? (lastResult?.payout ?? 0) : bet
  const { whole, cents } = formatAmount(displayAmount)

  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => resetToIdle(), POPUP_AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [isVisible, resetToIdle])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.root}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: BG_TRANSITION_DURATION_S }}
        >
          {/* Full-screen color overlay */}
          {overlayColor && (
            <div className={styles.colorOverlay} style={{ backgroundColor: overlayColor }} />
          )}

          {/* Sunburst — win only */}
          {isWin && (
            <motion.div
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

          {/* Board + amount centered over it */}
          <motion.div
            className={styles.popup}
            initial={anim.initial}
            animate={anim.animate}
            exit={anim.exit}
            transition={anim.transition}
          >
            <img
              src={isWin ? winBoardImg : loseBoardImg}
              alt={isWin ? 'You Win!' : 'You Lose'}
              className={styles.board}
            />

            {/* Amount overlaid on board */}
            <div className={styles.amount}>
              <img src={betSymbolImg} alt="" className={styles.symbol} aria-hidden />
              <span className={isWin ? styles.payoutWin : styles.payoutLose}>
                <span className={styles.sign}>{isWin ? '+' : '−'}</span>
                <span>{whole}</span>
                <span className={styles.cents}>.{cents}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
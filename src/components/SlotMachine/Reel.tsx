import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { type ReelProps, ReelStatus, SymbolId } from '../../shared/types'
import { SYMBOLS, SYMBOL_LIST } from '../../shared/constants/symbols'
import { REEL_SPIN_LOOP_INTERVAL_MS } from '../../shared/constants/game'
import styles from './Reel.module.css'

const SYMBOL_HEIGHT = 110 // px — must match CSS .symbolImg height

function getRandomSymbolId(): SymbolId {
  const total = SYMBOL_LIST.reduce((sum, s) => sum + s.weight, 0)
  let rand = Math.random() * total
  for (const s of SYMBOL_LIST) {
    rand -= s.weight
    if (rand <= 0) return s.id
  }
  return SYMBOL_LIST[0].id
}

// Strip always holds [above, visible, below]
interface Strip {
  above: SymbolId
  visible: SymbolId
  below: SymbolId
}

function buildInitialStrip(symbolId: SymbolId): Strip {
  return {
    above: getRandomSymbolId(),
    visible: symbolId,
    below: getRandomSymbolId(),
  }
}

export function Reel({ symbolId, status }: ReelProps) {
  const [strip, setStrip] = useState<Strip>(() => buildInitialStrip(symbolId))
  const [translateY, setTranslateY] = useState(-SYMBOL_HEIGHT)
  const [isBlurred, setIsBlurred] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const controls = useAnimation()

  // ── Spin loop ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (status === ReelStatus.Spinning) {
      setIsBlurred(true)

      intervalRef.current = setInterval(() => {
        // Snap to top (show "above" symbol instantly)
        setTranslateY(0)

        // Shift strip down: new symbol enters from above
        setStrip((prev) => ({
          above: getRandomSymbolId(),
          visible: prev.above,
          below: prev.visible,
        }))

        // Animate strip down to show new visible symbol
        requestAnimationFrame(() => {
          setTranslateY(-SYMBOL_HEIGHT)
        })
      }, REEL_SPIN_LOOP_INTERVAL_MS)

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [status])

  // ── Stop on final symbol ────────────────────────────────────────────────────
  useEffect(() => {
    if (status === ReelStatus.Stopping) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      setIsBlurred(false)

      // Set final symbol as visible
      setStrip({
        above: getRandomSymbolId(),
        visible: symbolId,
        below: getRandomSymbolId(),
      })
      setTranslateY(-SYMBOL_HEIGHT)

      // Bounce animation on the symbol image
      controls.start({
        scale: [1, 1.12, 0.96, 1.04, 1],
        transition: { duration: 0.45, ease: 'easeOut' },
      })
    }
  }, [status, symbolId, controls])

  // ── Sync symbol when idle (initial / reset) ─────────────────────────────────
  useEffect(() => {
    if (status === ReelStatus.Idle || status === ReelStatus.Stopped) {
      setStrip(buildInitialStrip(symbolId))
      setTranslateY(-SYMBOL_HEIGHT)
      setIsBlurred(false)
    }
  }, [symbolId, status])

  const symbol = SYMBOLS[symbolId]

  return (
    <div className={styles.window}>
      {/* Scrolling strip */}
      <div
        className={styles.strip}
        style={{
          transform: `translateY(${translateY}px)`,
          transition:
            status === ReelStatus.Spinning
              ? `transform ${REEL_SPIN_LOOP_INTERVAL_MS - 10}ms linear`
              : 'none',
          filter: isBlurred ? 'blur(3px)' : 'none',
        }}
      >
        {/* Above */}
        <div className={styles.symbolSlot}>
          <img
            src={SYMBOLS[strip.above].imagePath}
            alt={SYMBOLS[strip.above].label}
            className={styles.symbolImg}
            draggable={false}
          />
        </div>

        {/* Visible (center) */}
        <div className={styles.symbolSlot}>
          <motion.img
            src={symbol.imagePath}
            alt={symbol.label}
            className={styles.symbolImg}
            animate={controls}
            draggable={false}
          />
        </div>

        {/* Below */}
        <div className={styles.symbolSlot}>
          <img
            src={SYMBOLS[strip.below].imagePath}
            alt={SYMBOLS[strip.below].label}
            className={styles.symbolImg}
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
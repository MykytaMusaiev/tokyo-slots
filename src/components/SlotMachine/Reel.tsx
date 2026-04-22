import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { type ReelProps, ReelStatus, SymbolId } from '../../shared/types'
import { SYMBOLS, SYMBOL_LIST } from '../../shared/constants/symbols'
import { REEL_SPIN_LOOP_INTERVAL_MS } from '../../shared/constants/game'
import styles from './Reel.module.css'

const SYMBOL_HEIGHT_FALLBACK = 110

function getRandomSymbolId(): SymbolId {
  const total = SYMBOL_LIST.reduce((sum, s) => sum + s.weight, 0)
  let rand = Math.random() * total
  for (const s of SYMBOL_LIST) {
    rand -= s.weight
    if (rand <= 0) return s.id
  }
  return SYMBOL_LIST[0].id
}

interface ReelStrip {
  above: SymbolId
  visible: SymbolId
  below: SymbolId
  translateY: number
}

function buildIdleStrip(symbolId: SymbolId, h: number): ReelStrip {
  return {
    above: getRandomSymbolId(),
    visible: symbolId,
    below: getRandomSymbolId(),
    translateY: -h,
  }
}

export function Reel({ symbolId, status }: ReelProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const getSymbolHeight = (): number =>
    windowRef.current?.offsetHeight ?? SYMBOL_HEIGHT_FALLBACK

  const [strip, setStrip] = useState<ReelStrip>(() =>
    buildIdleStrip(symbolId, SYMBOL_HEIGHT_FALLBACK)
  )

  // isBlurred is derived from status — no state needed
  const isBlurred = status === ReelStatus.Spinning

  // ── Stopping / Idle: DOM position sync before paint ─────────────────────────
  useLayoutEffect(() => {
    if (status === ReelStatus.Stopping) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setStrip({
        above: getRandomSymbolId(),
        visible: symbolId,
        below: getRandomSymbolId(),
        translateY: -getSymbolHeight(),
      })
    }

    if (status === ReelStatus.Idle || status === ReelStatus.Stopped) {
      setStrip(buildIdleStrip(symbolId, getSymbolHeight()))
    }
  }, [status, symbolId])

  // ── Bounce animation on stop ─────────────────────────────────────────────────
  useEffect(() => {
    if (status !== ReelStatus.Stopping) return
    controls.start({
      scale: [1, 1.12, 0.96, 1.04, 1],
      transition: { duration: 0.45, ease: 'easeOut' },
    })
  }, [status, controls])

  // ── Spin loop ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (status !== ReelStatus.Spinning) return

    intervalRef.current = setInterval(() => {
      const h = getSymbolHeight()

      // Snap strip to top (in setInterval callback — not synchronous in effect body)
      setStrip((prev) => ({ ...prev, translateY: 0 }))

      // Shift strip down one symbol
      requestAnimationFrame(() => {
        setStrip((prev) => ({
          above: getRandomSymbolId(),
          visible: prev.above,
          below: prev.visible,
          translateY: -h,
        }))
      })
    }, REEL_SPIN_LOOP_INTERVAL_MS)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [status])

  const symbol = SYMBOLS[strip.visible]

  return (
    <div className={styles.window} ref={windowRef}>
      <div
        className={styles.strip}
        style={{
          transform: `translateY(${strip.translateY}px)`,
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
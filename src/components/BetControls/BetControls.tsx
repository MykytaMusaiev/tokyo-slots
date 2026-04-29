import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../shared/store/gameStore'
import { selectBet, selectIsSpinning } from '../../shared/store/gameStore'
import { BET_MIN, BET_MAX, BET_STEP } from '../../shared/constants/game'
import betButtonImg from '../../shared/assets/bet/bet_control_button.png'
import betSymbolImg from '../../shared/assets/bet/bet_symbol.png'
import styles from './BetControls.module.css'
import { soundService } from '../../shared/service/soundService'
import { SOUND_KEY } from '../../shared/constants/sounds'

const SHADOW_NORMAL = '0 5px 0 #2a1208'
const SHADOW_NONE = '0 0px 0 #2a1208'

function clampBet(value: number): number {
  return Math.min(BET_MAX, Math.max(BET_MIN, value))
}

export function BetControls() {
  const bet = useGameStore(selectBet)
  const isSpinning = useGameStore(selectIsSpinning)
  const setBet = useGameStore((s) => s.setBet)

  const [inputValue, setInputValue] = useState<string>(String(bet))

  const handleChangeBet = (delta: number) => {
    const next = clampBet(bet + delta)
    setBet(next)
    setInputValue(String(next))
    soundService.play(SOUND_KEY.CHANGE_BET)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setInputValue(raw)
  }

  const handleInputBlur = () => {
    const parsed = parseInt(inputValue, 10)
    const clamped = isNaN(parsed) ? BET_MIN : clampBet(parsed)
    setBet(clamped)
    setInputValue(String(clamped))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>PLACE A BID</span>

      <div className={styles.row}>
        {/* Decrease button */}
        <motion.button
          className={styles.controlButton}
          style={{ backgroundImage: `url(${betButtonImg})`, boxShadow: SHADOW_NORMAL }}
          whileTap={
            isSpinning
              ? {}
              : { y: 5, boxShadow: SHADOW_NONE }
          }
          transition={{ duration: 0.08 }}
          onClick={() => handleChangeBet(-BET_STEP)}
          disabled={isSpinning || bet <= BET_MIN}
          aria-label="Decrease bet"
        >
          <span className={styles.controlSign}>−</span>
        </motion.button>

        <div className={styles.display}>
          <img src={betSymbolImg} alt="bet symbol" className={styles.symbol} />
          <input
            className={styles.input}
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            readOnly={isSpinning}
            aria-label="Bet amount"
          />
        </div>

        {/* Increase button */}
        <motion.button
          className={styles.controlButton}
          style={{ backgroundImage: `url(${betButtonImg})`, boxShadow: SHADOW_NORMAL }}
          whileTap={
            isSpinning
              ? {}
              : { y: 5, boxShadow: SHADOW_NONE }
          }
          transition={{ duration: 0.08 }}
          onClick={() => handleChangeBet(BET_STEP)}
          disabled={isSpinning || bet >= BET_MAX}
          aria-label="Increase bet"
        >
          <span className={styles.controlSign}>+</span>
        </motion.button>
      </div>
    </div>
  )
}
import { motion } from 'framer-motion'
import { useGameStore, selectIsSpinning, selectBalance, selectBet } from '../../shared/store/gameStore'
import spinNormalImg from '../../shared/assets/bet/spin_button.png'
import spinPressedImg from '../../shared/assets/bet/spin_button_pressed.png'
import styles from './SpinButton.module.css'

const PRESS_TRANSITION = {
  type: 'spring',
  stiffness: 400,
  damping: 20,
} as const

export function SpinButton() {
  const isSpinning = useGameStore(selectIsSpinning)
  const balance = useGameStore(selectBalance)
  const bet = useGameStore(selectBet)
  const spin = useGameStore((s) => s.spin)

  const isDisabled = isSpinning || balance < bet

  return (
    <motion.button
      className={styles.button}
      whileTap={isDisabled ? {} : { y: 8 }}
      transition={PRESS_TRANSITION}
      onClick={isDisabled ? undefined : spin}
      disabled={isDisabled}
      aria-label="Spin"
    >
      {/* Normal state */}
      <motion.img
        src={spinNormalImg}
        alt=""
        className={styles.img}
        whileTap={isDisabled ? {} : { opacity: 0 }}
        transition={{ duration: 0.1 }}
        aria-hidden
      />

      {/* Pressed state */}
      <motion.img
        src={spinPressedImg}
        alt=""
        className={styles.img}
        initial={{ opacity: 0 }}
        whileTap={isDisabled ? {} : { opacity: 1 }}
        transition={{ duration: 0.1 }}
        aria-hidden
      />
    </motion.button>
  )
}
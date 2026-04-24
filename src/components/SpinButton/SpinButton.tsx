import { motion } from 'framer-motion'
import { useGameStore, selectIsSpinning, selectBalance, selectBet, selectSpinSource } from '../../shared/store/gameStore'
import spinNormalImg from '../../shared/assets/bet/spin_button.png'
import spinPressedImg from '../../shared/assets/bet/spin_button_pressed.png'
import styles from './SpinButton.module.css'
import { soundService } from '../../shared/service/soundService'
import { SOUND_KEY } from '../../shared/constants/sounds'
import { SpinSource } from '../../shared/types'

const PRESS_TRANSITION = {
  type: 'spring',
  stiffness: 400,
  damping: 20,
} as const

const IMG_TRANSITION = { duration: 0.1 } as const

export function SpinButton() {
  const isSpinning = useGameStore(selectIsSpinning)
  const balance = useGameStore(selectBalance)
  const bet = useGameStore(selectBet)
  const spin = useGameStore((s) => s.spin)
  const spinSource = useGameStore(selectSpinSource)

  const isPressedDown = isSpinning && spinSource === SpinSource.Button
  const isDisabled = isSpinning || balance < bet

  return (
    <motion.button
      className={styles.button}
      animate={{ y: isPressedDown ? 8 : 0 }}
      whileTap={isDisabled ? {} : { y: 8 }}
      transition={PRESS_TRANSITION}
      onClick={isDisabled ? undefined : () => {
        soundService.play(SOUND_KEY.SPIN_BUTTON)
        spin(SpinSource.Button)
      }}
      disabled={isDisabled}
      aria-label="Spin"
    >
      {/* Normal state */}
      <motion.img
        src={spinNormalImg}
        alt=""
        className={styles.img}
        animate={{ opacity: isPressedDown ? 0 : 1 }}
        transition={IMG_TRANSITION}
        aria-hidden
      />

      {/* Pressed state */}
      <motion.img
        src={spinPressedImg}
        alt=""
        className={styles.img}
        animate={{ opacity: isPressedDown ? 1 : 0 }}
        transition={IMG_TRANSITION}
        aria-hidden
      />
    </motion.button>
  )
}
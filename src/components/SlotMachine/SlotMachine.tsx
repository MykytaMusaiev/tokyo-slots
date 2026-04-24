import { motion, useAnimation } from 'framer-motion'
import { useGameStore, selectIsSpinning, selectReels } from '../../shared/store/gameStore'
import styles from './SlotMachine.module.css'
import { Reel } from './Reel'
import { soundService } from '../../shared/service/soundService'
import { SOUND_KEY } from '../../shared/constants/sounds'
import { SpinSource } from '../../shared/types'
import slotBodyImg from '../../shared/assets/slot_machine/slot_body.png'
import handleImg from '../../shared/assets/slot_machine/handle.png'
import leverImg from '../../shared/assets/slot_machine/lever.png'

export function SlotMachine() {
  const reels = useGameStore(selectReels)
  const isSpinning = useGameStore(selectIsSpinning)
  const spin = useGameStore((s) => s.spin)
  const leverControls = useAnimation()

  const handleLeverClick = async () => {
    if (isSpinning) return

    soundService.play(SOUND_KEY.LEVER_DOWN)

    // 1. Різке опускання вниз (імітація натискання)
    await leverControls.start({
      scaleY: 0.4,
      originY: 1,
      transition: { duration: 0.15, ease: 'circIn' },
    })

    spin(SpinSource.Lever)

    // 2. Повернення з "відскоком" (Spring)
    await leverControls.start({
      scaleY: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 250, // Жорсткість пружини
        damping: 12,    // Наскільки швидко згасають коливання
        mass: 0.8       // "Вага" важеля
      },
    })
  }

  return (
    <div className={styles.root}>
      <div className={styles.reelsArea}>
        {reels.map((reel, i) => (
          <Reel
            key={i}
            reelIndex={i}
            symbolId={reel.symbolId}
            status={reel.status}
          />
        ))}
      </div>

      {/* Slot body overlay */}
      <img src={slotBodyImg} alt="Slot machine" className={styles.body} draggable={false} />

      {/* Lever */}
      <motion.div
        className={styles.leverWrapper}
        animate={leverControls}
        onClick={handleLeverClick}
        style={{
          cursor: isSpinning ? 'not-allowed' : 'pointer',
        }}
      >
        <img src={handleImg} alt="Handle" className={styles.leverHandle} draggable={false} />
        <img src={leverImg} alt="Lever" className={styles.leverBar} draggable={false} />
      </motion.div>
    </div>
  )
}
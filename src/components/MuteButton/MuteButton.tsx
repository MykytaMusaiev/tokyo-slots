import { useGameStore, selectIsMuted } from '../../shared/store/gameStore'
import styles from './MuteButton.module.css'

export function MuteButton() {
  const isMuted = useGameStore(selectIsMuted)
  const setMuted = useGameStore((s) => s.setMuted)

  return (
    <button
      className={`${styles.button} ${isMuted ? styles.muted : ''}`}
      onClick={() => setMuted(!isMuted)}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      <span className={styles.icon} aria-hidden>
        {isMuted ? '🔇' : '🔊'}
      </span>
    </button>
  )
}
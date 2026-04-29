import { useGameStore, selectBalance } from '../../shared/store/gameStore'
import { useAnimatedNumber } from '../../shared/hooks/useAnimatedNumber'
import betSymbolImg from '../../shared/assets/bet/bet_symbol.png'
import styles from './BalanceDisplay.module.css'
import { formatBalance } from '../../shared/utils/formatBalance'

export function BalanceDisplay() {
  const balance = useGameStore(selectBalance)
  const animated = useAnimatedNumber(balance)
  const { whole, cents } = formatBalance(animated)

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Balance</span>
      <div className={styles.panel}>
        <img src={betSymbolImg} alt="betIcon" className={styles.symbol} aria-hidden />
        <span className={styles.amount}>
          <span className={styles.whole}>{whole}</span>
          <span className={styles.cents}>.{cents}</span>
        </span>
      </div>
    </div>
  )
}
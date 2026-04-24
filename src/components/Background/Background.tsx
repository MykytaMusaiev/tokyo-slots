import styles from './Background.module.css'
import { Particles } from './Particles'
import headerImg from '../../shared/assets/images/header.svg'
import cityImg from '../../shared/assets/images/tokiocity.svg'

export function Background() {
  return (
    <div className={styles.root}>
      <div className={styles.headerStrip}>
        <img src={headerImg} alt="Top_Cloud" className={styles.headerImg} aria-hidden="true" />
      </div>

      <div className={styles.bgColor} />

      <Particles />

      <div className={styles.cityLayer}>
        <img src={cityImg} alt="CityImg" className={styles.city} aria-hidden="true" />
      </div>
    </div>
  )
}
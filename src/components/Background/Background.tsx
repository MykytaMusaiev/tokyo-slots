import styles from './Background.module.css'
import { Particles } from './Particles'

export function Background() {
  return (
    <div className={styles.root}>
      <div className={styles.headerStrip}>
        <img
          src="/src/shared/assets/images/header.svg"
          alt=""
          className={styles.headerImg}
          aria-hidden="true"
        />
      </div>

      <div className={styles.bgColor} />

      <Particles />

      <div className={styles.cityLayer}>
        <img
          src="/src/shared/assets/images/tokiocity.svg"
          alt=""
          className={styles.city}
          aria-hidden="true"
        />
      </div>

      <div className={styles.cloudsLayer}>
        <img
          src="/src/shared/assets/images/clouds.svg"
          alt=""
          className={styles.clouds}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
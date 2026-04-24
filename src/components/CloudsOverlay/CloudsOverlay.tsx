import styles from './CloudsOverlay.module.css'
import cloudsImg from '../../shared/assets/images/clouds.svg'
import cloudMobileImg from '../../shared/assets/images/cloud_mobile.svg'

export function CloudsOverlay() {
  return (
    <picture className={styles.root}>
      <source srcSet={cloudMobileImg} media="(max-width: 768px)" />
      <img
        src={cloudsImg}
        alt="Cloud_Bottom"
        className={styles.clouds}
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}
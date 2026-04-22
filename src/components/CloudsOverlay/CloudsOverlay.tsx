import styles from './CloudsOverlay.module.css'

export function CloudsOverlay() {
  return (
    <picture className={styles.root}>
      <source
        srcSet="/src/shared/assets/images/cloud_mobile.svg"
        media="(max-width: 768px)"
      />
      <img
        src="/src/shared/assets/images/clouds.svg"
        alt=""
        className={styles.clouds}
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}
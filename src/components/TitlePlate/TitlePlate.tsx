import styles from './TitlePlate.module.css'

export function TitlePlate() {
  return (
    <div className={styles.root}>
      <img
        src="/src/shared/assets/images/title.png"
        alt="Tokyo Slots"
        className={styles.image}
        draggable={false}
      />
    </div>
  )
}
import styles from './TitlePlate.module.css'
import titleImg from '../../shared/assets/images/title.png'

export function TitlePlate() {
  return (
    <div className={styles.root}>
      <img
        src={titleImg}
        alt="Tokyo Slots"
        className={styles.image}
        draggable={false}
      />
    </div>
  )
}
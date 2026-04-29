import { useEffect, useRef } from 'react'
import styles from './CloudsOverlay.module.css'
import cloudsImg from '../../shared/assets/images/clouds.svg'
import cloudMobileImg from '../../shared/assets/images/cloud_mobile.svg'

interface CloudsOverlayProps {
  onHeightChange: (height: number) => void
}

export function CloudsOverlay({ onHeightChange }: CloudsOverlayProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height ?? 0
      onHeightChange(height)
    })

    observer.observe(el)

    return () => observer.disconnect()
  }, [onHeightChange])

  return (
    <picture ref={ref} className={styles.root}>
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
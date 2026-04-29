import { useCallback, useState } from 'react'
import { Background } from "./components/Background"
import { SlotMachine } from "./components/SlotMachine/SlotMachine"
import { TitlePlate } from "./components/TitlePlate/TitlePlate"
import { useGameLogic } from "./shared/hooks/useGameLogic"
import styles from './App.module.css'
import { BetControls } from "./components/BetControls/BetControls"
import { SpinButton } from "./components/SpinButton/SpinButton"
import { BalanceDisplay } from "./components/BalanceDisplay/BalanceDisplay"
import { ResultPopup } from "./components/ResultPopup/ResultPopup"
import { CloudsOverlay } from "./components/CloudsOverlay/CloudsOverlay"
import { useSound } from "./shared/hooks/useSound"
import { MuteButton } from "./components/MuteButton/MuteButton"

function App() {
  useGameLogic()
  useSound()

  const [cloudsHeight, setCloudsHeight] = useState<number>(273)

  const handleCloudsHeightChange = useCallback((height: number) => {
    setCloudsHeight(height)
  }, [])

  return (
    <div
      className={styles.appRoot}
      style={{ '--clouds-h': `${cloudsHeight}px` } as React.CSSProperties}
    >
      <Background />
      <MuteButton />
      <ResultPopup />
      <main className={styles.main}>
        <TitlePlate />
        <SlotMachine />
        <BetControls />
      </main>
      <div className={styles.spinButtonLayer}>
        <SpinButton />
      </div>
      <CloudsOverlay onHeightChange={handleCloudsHeightChange} />
      <footer className={styles.footer}>
        <BalanceDisplay />
      </footer>
    </div>
  )
}

export default App
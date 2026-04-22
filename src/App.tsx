import { Background } from "./components/Background"
import { SlotMachine } from "./components/SlotMachine/SlotMachine"
import { TitlePlate } from "./components/TitlePlate/TitlePlate"
import { useGameLogic } from "./shared/hooks/useGameLogic"
import styles from './App.module.css'
import { BetControls } from "./components/BetControls/BetControls"
import { SpinButton } from "./components/SpinButton/SpinButton"
import { BalanceDisplay } from "./components/BalanceDisplay/BalanceDisplay"
import { ResultPopup } from "./components/ResultPopup/ResultPopup"

function App() {
  useGameLogic()

  return (
    <div className={styles.appRoot}>
      <Background />
      <ResultPopup />

      <main className={styles.main}>
        <TitlePlate />
        <SlotMachine />
        <BetControls />
        <SpinButton />
      </main>

      <footer className={styles.footer}>
        <BalanceDisplay />
      </footer>
    </div>
  )
}

export default App
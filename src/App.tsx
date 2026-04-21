// import { selectBalance, selectBet, selectGameState, useGameStore } from "./shared/store/gameStore"

import { Background } from "./components/Background"
import { SlotMachine } from "./components/SlotMachine/SlotMachine"
import { TitlePlate } from "./components/TitlePlate/TitlePlate"
import { useGameLogic } from "./shared/hooks/useGameLogic"
import styles from './App.module.css'

function App() {
  // const balance = useGameStore(selectBalance)
  // const bet = useGameStore(selectBet)
  // const gameState = useGameStore(selectGameState)

  useGameLogic()

  return (
    <div className="app-root">
      <Background />
      <div className={styles.slotMachineBlock}>
        <TitlePlate />
        <SlotMachine />
      </div>
    </div>
  )
}

export default App
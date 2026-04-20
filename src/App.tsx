import { selectBalance, selectBet, selectGameState, useGameStore } from "./shared/store/gameStore"

function App() {
  const balance = useGameStore(selectBalance)
  const bet = useGameStore(selectBet)
  const gameState = useGameStore(selectGameState)

  return (
    <div className="app-root">
      <p>Tokyo Slots — store OK</p>
      {/* TODO fix on later stage */}
      <pre style={{ fontSize: 12, opacity: 0.5 }}>
        {JSON.stringify({ balance, bet, gameState }, null, 2)}
      </pre>
    </div>
  )
}

export default App
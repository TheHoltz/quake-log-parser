import { useState } from 'react'

import gamesResume from '../../output/out.json'
import Selector from './components/Selector'
import GameBox from './components/GameBox'
import { Games } from './types/Game.type'

const useApp = () => {
  const gamesList = Object.keys(gamesResume) as Games[]
  const [selectedGame, setSelectedGame] = useState<Games>(gamesList[0])

  return {
    gamesList,
    selectedGame,
    setSelectedGame
  }
}

const App = () => {

  const {
    gamesList,
    selectedGame,
    setSelectedGame
  } = useApp()

  return (
    <div className='max-w-3xl mx-auto px-2'>
      <h1 className='text-center mb-10 font-black text-5xl mt-20'>
        Quake Parser Viewer
      </h1>
      <Selector
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        gamesList={gamesList}
      />
      <GameBox game={gamesResume[selectedGame]} />
    </div>
  )
}

export default App

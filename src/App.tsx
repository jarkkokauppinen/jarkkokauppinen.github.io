import { useState } from 'react'
import { maps } from './utils/maps'
import { Controls } from './components/Controls'
import { Map } from './components/Map'
import { Runner } from './components/Runner'

function App() {
  const [drawing, setDrawing] = useState<boolean>(true)
  const [currentMap, setMap] = useState<{ id: number; map: number[][] }>(
    maps[Math.floor(Math.random() * maps.length)]
  )

  return (
    <>
      <Controls
        drawing={drawing}
        setDrawing={setDrawing}
        currentMap={currentMap}
        setMap={setMap}
      />
      <Map drawing={drawing} currentMap={currentMap} setMap={setMap} />
      <Runner />
    </>
  )
}

export default App

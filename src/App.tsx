import { ContextProvider } from './State'
import { Controls } from './components/Controls'
import { Map } from './components/Map'
import { Runner } from './components/Runner'

function App() {
  return (
    <ContextProvider>
      <Controls />
      <Map />
      <Runner />
    </ContextProvider>
  )
}

export default App

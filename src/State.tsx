import { createContext, useState } from 'react'
import { maps } from './utils/maps'

interface Map {
  id: number
  content: number[][]
}

interface State {
  map: Map
  drawing: boolean
  running: boolean
  error: string
}

interface Context {
  state: State
  setState: (value: State) => void
}

const currentState = {
  map: maps[Math.floor(Math.random() * maps.length)],
  drawing: true,
  running: false,
  error: '',
}

const Context = createContext<Context | null>(null)

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState(currentState)
  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  )
}

export { Context, ContextProvider }

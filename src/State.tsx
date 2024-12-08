import { createContext, useState } from 'react'
import { maps } from './utils/maps'

interface State {
  map: { id: number; content: number[][] }
  drawing: boolean
  running: boolean
}

interface Context {
  state: State
  setState: (value: State) => void
}

const currentState = {
  map: maps[Math.floor(Math.random() * maps.length)],
  drawing: true,
  running: false,
}

const Context = createContext<Context | null>(null)

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState(currentState)
  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  )
}

export { Context, ContextProvider }

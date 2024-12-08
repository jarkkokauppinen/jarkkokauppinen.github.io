import { createContext, useState } from 'react'

const Context = createContext(null)

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <Context.Provider value={null}>{children}</Context.Provider>
}

export { Context, ContextProvider }

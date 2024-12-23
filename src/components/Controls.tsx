import { empty, maps } from '../utils/maps'
import { useContext } from 'react'
import { Context } from '../State'
import * as Styles from '../styles'

export const Controls = () => {
  const context = useContext(Context)!

  const clear = () => {
    if (context.state.running) return

    context.setState({
      ...context.state,
      map: { id: -1, content: empty },
      error: '',
    })
  }

  const randomize = () => {
    if (context.state.running) return

    const random = Math.floor(Math.random() * maps.length)
    if (context.state.map.id === random) return randomize()

    context.setState({
      ...context.state,
      map: { id: random, content: maps[random].content },
      error: '',
    })
  }

  return (
    <Styles.Content>
      <Styles.Box>
        <Styles.Button
          onClick={clear}
          $running={context.state.running}
          $marginRight='5px'
        >
          <kbd>Clear</kbd>
        </Styles.Button>
        <Styles.Button onClick={randomize} $running={context.state.running}>
          <kbd>Randomize</kbd>
        </Styles.Button>
      </Styles.Box>
    </Styles.Content>
  )
}

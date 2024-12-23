import { useContext } from 'react'
import { Context } from '../State'
import * as Styles from '../styles'

export const Runner = () => {
  const context = useContext(Context)!

  const run = () => {
    if (context.state.running) return
    context.setState({ ...context.state, running: true, error: '' })
  }

  return (
    <Styles.Content>
      <Styles.Error>
        <kbd>{context.state.error}</kbd>
      </Styles.Error>
      <Styles.Button onClick={run} $running={context.state.running}>
        <kbd>Run</kbd>
      </Styles.Button>
    </Styles.Content>
  )
}

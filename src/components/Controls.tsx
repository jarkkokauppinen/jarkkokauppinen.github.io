import { empty, maps } from '../utils/maps'
import { useContext } from 'react'
import { Context } from '../State'
import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const Button = styled.div<{ $running: boolean; $marginRight?: string }>`
  border: 1px solid lightgray;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 23px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: ${(props) => props.$marginRight};
  &:hover {
    background: ${(props) => !props.$running && 'darkgray'};
    border: ${(props) => !props.$running && '1px solid darkgray'};
  }
`

const Content = styled.div`
  display: flex;
`

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
    <Container>
      <Content>
        <Button
          onClick={clear}
          $running={context.state.running}
          $marginRight='5px'
        >
          <kbd>Clear</kbd>
        </Button>
        <Button onClick={randomize} $running={context.state.running}>
          <kbd>Randomize</kbd>
        </Button>
      </Content>
    </Container>
  )
}

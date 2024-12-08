import { empty, maps } from '../utils/maps'
import { useContext } from 'react'
import { Context } from '../State'
import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const Button = styled.div`
  cursor: default;
  border: 4px solid darkblue;
  padding: 4px;
  &:hover {
    background: lightblue;
  }
`

const Content = styled.div`
  display: flex;
`

export const Controls = () => {
  const context = useContext(Context)!

  const clear = () => {
    context.setState({ ...context.state, map: { id: -1, content: empty } })
  }

  const randomize = () => {
    const random = Math.floor(Math.random() * maps.length)
    if (context.state.map.id === random) return randomize()
    context.setState({
      ...context.state,
      map: { id: random, content: maps[random].content },
    })
  }

  const handleDrawing = () => {
    context.setState({ ...context.state, drawing: !context.state.drawing })
  }

  return (
    <Container>
      <Content>
        <Button onClick={clear}>Clear</Button>
        <Button onClick={randomize}>Randomize</Button>
      </Content>
      <Content>
        <Button onClick={handleDrawing}>[]</Button>
      </Content>
    </Container>
  )
}

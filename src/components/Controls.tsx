import { empty, maps } from '../utils/maps'
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

interface Props {
  drawing: boolean
  setDrawing: (value: boolean) => void
  currentMap: { id: number; map: number[][] }
  setMap: ({ id, map }: { id: number; map: number[][] }) => void
}

export const Controls = ({
  drawing,
  setDrawing,
  currentMap,
  setMap,
}: Props) => {
  const clear = () => {
    setMap({ id: -1, map: empty })
  }

  const randomize = () => {
    const random = Math.floor(Math.random() * maps.length)
    if (currentMap.id === random) return randomize()
    setMap({ id: random, map: maps[random].map })
  }

  const handleDrawing = () => {
    setDrawing(!drawing)
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

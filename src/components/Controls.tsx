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
  const randomize = () => {
    // ....
  }

  const clear = () => {
    // ....
  }

  return (
    <Container>
      <Content>
        <Button onClick={randomize}>Randomize</Button>
        <Button onClick={clear}>Clear</Button>
      </Content>
      <Content>
        <Button>[]</Button>
      </Content>
    </Container>
  )
}

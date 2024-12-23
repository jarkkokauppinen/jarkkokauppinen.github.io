import { useContext } from 'react'
import { Context } from '../State'
import { styled } from 'styled-components'

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

const Error = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  color: white;
`

const Button = styled.div<{ $running: boolean }>`
  border: 1px solid lightgray;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 23px;
  margin-top: 5px;
  &:hover {
    background: ${(props) => !props.$running && 'darkgray'};
    border: ${(props) => !props.$running && '1px solid darkgray'};
  }
`

export const Runner = () => {
  const context = useContext(Context)!

  const run = () => {
    if (context.state.running) return
    context.setState({ ...context.state, running: true, error: '' })
  }

  return (
    <Content>
      <Error>
        <kbd>{context.state.error}</kbd>
      </Error>
      <Button onClick={run} $running={context.state.running}>
        <kbd>Run</kbd>
      </Button>
    </Content>
  )
}

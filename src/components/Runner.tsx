import { useContext } from 'react'
import { Context } from '../State'
import { styled } from 'styled-components'

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

const Error = styled.div``

const Button = styled.div`
  cursor: default;
  border: 4px solid darkblue;
  padding: 4px;
  &:hover {
    background: lightblue;
  }
`

export const Runner = () => {
  const context = useContext(Context)!

  const run = () => {
    context.setState({ ...context.state, running: true })
  }

  return (
    <Content>
      <Error>Path not found</Error>
      <Button onClick={run}>Run</Button>
    </Content>
  )
}

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
  return (
    <Content>
      <Error>Path not found</Error>
      <Button>Run</Button>
    </Content>
  )
}

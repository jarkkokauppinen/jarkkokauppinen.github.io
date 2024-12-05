import { styled } from 'styled-components'

const Content = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})

const Error = styled('div')({})

const Button = styled('div')({})

export const Runner = () => {
  return (
    <Content>
      <Error>No way</Error>
      <Button>Run</Button>
    </Content>
  )
}

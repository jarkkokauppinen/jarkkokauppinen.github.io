import { styled } from 'styled-components'
import wall from '../assets/wall.png'

const LIGHT = 'rgb(0, 30, 40)'
const MEDIUM = 'rgb(0, 15, 20)'
const DARK = 'rgb(0, 0, 0)'
const RED = 'rgb(215, 15, 15)'

export const Background = styled.div`
  background: radial-gradient(${LIGHT}, ${MEDIUM}, ${DARK});
`
export const Block = styled.div<{ $block: number; $running: boolean }>`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-image: ${(props) => props.$block === 1 && `url(${wall})`};
  &:hover {
    opacity: ${(props) => !props.$running && '0.3'};
    background-image: ${(props) => !props.$running && `url(${wall})`};
  }
`

export const Box = styled.div`
  display: flex;
`

export const Button = styled.div<{ $running: boolean; $marginRight?: string }>`
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

export const Circle = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: red;
  box-shadow: 0 0 15px ${RED};
`

export const CircleParent = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Error = styled.div`
  display: flex;
  align-items: center;
  color: white;
`

export const Path = styled.div`
  width: 15px;
  height: 15px;
`

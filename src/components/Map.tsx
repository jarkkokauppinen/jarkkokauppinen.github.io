import { useEffect, useRef, useState } from 'react'
import { maps } from '../utils/maps'
import { styled } from 'styled-components'

const Row = styled('div')({
  display: 'flex',
})

const Block = styled('div')({
  width: 49,
  height: 49,
  display: 'flex',
  flexWrap: 'wrap',
  border: '1px solid black',
})

const Path = styled('div')({
  width: 15,
  height: 15,
  border: '1px solid black',
})

export const Map = () => {
  const refs: React.MutableRefObject<HTMLDivElement[]> = useRef([])
  const [currentMap] = useState<number[][]>(
    maps[Math.floor(Math.random() * maps.length)]
  )

  useEffect(() => {
    console.log(refs.current)
  }, [])

  const renderPath = (i: number) => {
    console.log(i)
    return <Path key={i} ref={(el) => refs.current[i] === el} />
  }

  return currentMap.map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((_, blockIndex) => (
        <Block key={blockIndex}>
          {Array(9)
            .fill(null)
            .map((_, i) => renderPath(i))}
        </Block>
      ))}
    </Row>
  ))
}

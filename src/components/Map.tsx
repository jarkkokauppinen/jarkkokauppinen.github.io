import { useEffect, useRef, useState } from 'react'
import { maps } from '../utils/maps'
import { styled } from 'styled-components'
import wall from '../assets/wall.png'

const MEDIUM = 'rgb(0, 15, 20)'
const LIGHT = 'rgb(0, 30, 40)'
const DARK = 'rgb(0, 0, 0)'

const Background = styled.div`
  background: radial-gradient(${LIGHT}, ${MEDIUM}, ${DARK});
  border: 10px solid lightgray;
  border-radius: 5px;
`

const Row = styled.div`
  display: flex;
`

const Block = styled.div<{ $block: number }>`
  width: 45px;
  height: 45px;
  display: flex;
  flex-wrap: wrap;
  background-image: url(${(props) => props.$block === 1 && wall});
  &:hover {
    background: ${(props) => props.$block === 0 && 'rgb(30, 30, 30)'};
  }
`

const Path = styled.div`
  width: 15px;
  height: 15px;
`

const PATHS_PER_BLOCK = 9

export const Map = () => {
  const refs: React.MutableRefObject<HTMLDivElement[]> = useRef([])
  const [currentMap, setMap] = useState<number[][]>(
    maps[Math.floor(Math.random() * maps.length)]
  )

  useEffect(() => {
    // ....
  }, [])

  const handleBlock = (row: number, block: number) => {
    const updatedMap = Array.from(currentMap)
    updatedMap[row][block] = 1
    setMap(updatedMap)
  }

  return (
    <Background>
      {currentMap.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((block, blockIndex) => (
            <Block
              key={blockIndex}
              $block={block}
              onClick={() => handleBlock(rowIndex, blockIndex)}
            >
              {Array(PATHS_PER_BLOCK)
                .fill(null)
                .map((_, pathIndex) => {
                  const sum = PATHS_PER_BLOCK * blockIndex + pathIndex
                  const add = PATHS_PER_BLOCK * rowIndex * row.length
                  return (
                    <Path
                      key={sum + add}
                      ref={(e) => e && (refs.current[sum + add] = e)}
                    ></Path>
                  )
                })}
            </Block>
          ))}
        </Row>
      ))}
    </Background>
  )
}

import { useEffect, useRef } from 'react'
import { styled } from 'styled-components'
// import wall from '../assets/wall.png'

// const MEDIUM = 'rgb(0, 15, 20)'
// const LIGHT = 'rgb(0, 30, 40)'
// const DARK = 'rgb(0, 0, 0)'

const Background = styled.div`
  border: 10px solid lightgray;
  border-radius: 5px;
`

const Row = styled.div`
  display: flex;
`

const Block = styled.div<{ $block: number }>`
  width: 49px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border: 1px solid black;
  background: ${(props) => props.$block === 1 && 'rgb(30, 30, 30)'};
  &:hover {
    background: ${(props) => props.$block === 0 && 'rgb(30, 30, 30)'};
  }
`

const Path = styled.div`
  width: 15px;
  height: 15px;
  border: 1px solid black;
`

const CircleParent = styled.div`
  width: 49px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`

const Circle = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: red;
`

interface Props {
  drawing: boolean
  currentMap: { id: number; map: number[][] }
  setMap: ({ id, map }: { id: number; map: number[][] }) => void
}

const PATHS_PER_BLOCK = 9

export const Map = ({ drawing, currentMap, setMap }: Props) => {
  const refs: React.MutableRefObject<HTMLDivElement[]> = useRef([])

  useEffect(() => {
    // refs.current[9].style.background = 'green'
    // refs.current[12].style.borderRadius = '50% 0 0 50%'
  }, [])

  const handleBlock = (row: number, block: number) => {
    const updatedMap: number[][] = []

    currentMap.map.forEach((r, i) => {
      const newRow = [...r]
      if (i === row) newRow[block] = drawing ? 1 : 0
      updatedMap.push(newRow)
    })

    setMap({ id: currentMap.id, map: updatedMap })
  }

  const renderCircle = (row: number, block: number) => {
    const lastRow = currentMap.map.length - 1
    const lastBlock = currentMap.map[0].length - 1
    if ((row === 0 && block === 0) || (row === lastRow && block === lastBlock))
      return (
        <CircleParent>
          <Circle />
        </CircleParent>
      )
    return null
  }

  return (
    <Background>
      {currentMap.map.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((block, blockIndex) => (
            <div key={Math.random()}>
              {renderCircle(rowIndex, blockIndex) ?? (
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
              )}
            </div>
          ))}
        </Row>
      ))}
    </Background>
  )
}

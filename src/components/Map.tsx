import { useEffect, useContext, useRef } from 'react'
import { Context } from '../State'
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

const PATHS_PER_BLOCK = 9

export const Map = () => {
  const context = useContext(Context)!
  const refs: React.MutableRefObject<HTMLDivElement[]> = useRef([])

  const draw = () => {
    console.log('DRAW')
  }

  useEffect(() => {
    if (context.state.running) draw()
    // refs.current[9].style.background = 'green'
    // refs.current[12].style.borderRadius = '50% 0 0 50%'
  }, [context.state.running])

  const handleBlock = (row: number, block: number) => {
    const updatedMap: number[][] = []

    context.state.map.content.forEach((r, i) => {
      const newRow = [...r]
      if (i === row) newRow[block] = context.state.drawing ? 1 : 0
      updatedMap.push(newRow)
    })

    context.setState({
      ...context.state,
      map: { id: context.state.map.id, content: updatedMap },
    })
  }

  const renderCircle = (row: number, block: number) => {
    const lastRow = context.state.map.content.length - 1
    const lastBlock = context.state.map.content[0].length - 1
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
      {context.state.map.content.map((row, rowIndex) => (
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

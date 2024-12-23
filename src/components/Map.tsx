import { useCallback, useEffect, useContext, useMemo, useRef } from 'react'
import { Context } from '../State'
import { explorePaths } from '../utils/explorePaths'
import { findPath } from '../utils/findPath'
import { getLocations } from '../utils/getLocations'
import { PATHS_PER_BLOCK } from '../utils/constants'
import * as Styles from '../styles'

export const Map = () => {
  const context = useContext(Context)!
  const rows = context.state.map.content.length - 1
  const blocks = context.state.map.content[0].length - 1
  const refs: React.MutableRefObject<HTMLDivElement[]> = useRef([])

  const startAndEndPoints = useMemo(() => {
    return [
      PATHS_PER_BLOCK + 3,
      PATHS_PER_BLOCK * (blocks + 1) + 1,
      PATHS_PER_BLOCK * (blocks + 1) * rows - 2,
      PATHS_PER_BLOCK * (blocks + 1) * (rows + 1) - 13,
    ]
  }, [blocks, rows])

  const draw = useCallback(
    (location: [number, string]) => {
      refs.current[location[0]].style.background = 'lightgray'
      refs.current[location[0]].style.borderRadius = location[1]
      refs.current[startAndEndPoints[0]].style.borderRadius = '50% 0 0 50%'
      refs.current[startAndEndPoints[1]].style.borderRadius = '50% 50% 0 0'
      refs.current[startAndEndPoints[2]].style.borderRadius = '0 0 50% 50%'
      refs.current[startAndEndPoints[3]].style.borderRadius = '0 50% 50% 0'
      return new Promise((_) => setTimeout(_, 50))
    },
    [startAndEndPoints]
  )

  const handlePath = useCallback(
    async (path: number[][]) => {
      for (const [index, current] of path.entries()) {
        const next = path[index + 1]
        const following = path[index + 2]

        if (following) {
          const locations = getLocations(current, next, following, blocks)

          for (const location of locations) {
            await draw(location as [number, string])
          }
        } else {
          setTimeout(() => {
            context.setState({ ...context.state, running: false })
          }, 2000)
        }
      }
    },
    [blocks, context, draw]
  )

  useEffect(() => {
    if (context.state.running) {
      const paths = explorePaths(context.state.map.content)

      if (!paths.length) {
        return context.setState({
          ...context.state,
          running: false,
          error: 'Path not found',
        })
      }

      const path = findPath(paths)
      handlePath(path as number[][])
    }
  }, [context, handlePath])

  const handleBlock = (row: number, block: number) => {
    if (context.state.running) return

    const updatedMap: number[][] = []

    context.state.map.content.forEach((r, i) => {
      const newRow = [...r]
      if (i === row) newRow[block] = newRow[block] === 0 ? 1 : 0
      updatedMap.push(newRow)
    })

    context.setState({
      ...context.state,
      map: { id: context.state.map.id, content: updatedMap },
    })
  }

  const renderCircle = (row: number, block: number) => {
    if ((row === 0 && block === 0) || (row === rows && block === blocks))
      return (
        <Styles.CircleParent>
          <Styles.Circle />
        </Styles.CircleParent>
      )

    return null
  }

  return (
    <Styles.Background>
      {context.state.map.content.map((row, rowIndex) => (
        <Styles.Box key={rowIndex}>
          {row.map((block, blockIndex) => (
            <Styles.Box key={Math.random()}>
              {renderCircle(rowIndex, blockIndex) ?? (
                <Styles.Block
                  key={blockIndex}
                  $block={block}
                  $running={context.state.running}
                  onClick={() => handleBlock(rowIndex, blockIndex)}
                >
                  {Array(PATHS_PER_BLOCK)
                    .fill(null)
                    .map((_, pathIndex) => {
                      const sum =
                        PATHS_PER_BLOCK * blockIndex +
                        pathIndex +
                        PATHS_PER_BLOCK * rowIndex * row.length
                      return (
                        <Styles.Path
                          key={sum}
                          ref={(e) => e && (refs.current[sum] = e)}
                        ></Styles.Path>
                      )
                    })}
                </Styles.Block>
              )}
            </Styles.Box>
          ))}
        </Styles.Box>
      ))}
    </Styles.Background>
  )
}

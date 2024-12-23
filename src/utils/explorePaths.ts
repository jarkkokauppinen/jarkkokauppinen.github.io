const explore = (
  map: number[][],
  visited: number[][],
  coordinates: number[]
) => {
  if (map[coordinates[0]][coordinates[1]] === 1) return false

  for (const array of visited) {
    if (array[0] === coordinates[0] && array[1] === coordinates[1]) return false
  }

  return true
}

export const explorePaths = (map: number[][]) => {
  const visited: number[][] = []
  const locations = [[0, 0]]
  const amountOfBlocks = map[0].length * map.length
  const goal = [map.length - 1, map[0].length - 1]

  while (locations.length > 0 && locations.length < amountOfBlocks) {
    for (const location of locations) {
      const vertical = location[0]
      const horizontal = location[1]

      const isVisited = visited.find(
        (node: number[]) => node[0] === vertical && node[1] === horizontal
      )

      if (!isVisited) visited.push(location)
      if (vertical === goal[0] && horizontal === goal[1]) return visited

      // right
      if (horizontal < map[0].length - 1) {
        if (explore(map, visited, [vertical, horizontal + 1])) {
          locations.push([vertical, horizontal + 1])
        }
      }

      // down
      if (vertical < map.length - 1) {
        if (explore(map, visited, [vertical + 1, horizontal])) {
          locations.push([vertical + 1, horizontal])
        }
      }

      // up
      if (vertical > 0) {
        if (explore(map, visited, [vertical - 1, horizontal])) {
          locations.push([vertical - 1, horizontal])
        }
      }

      // left
      if (horizontal > 0) {
        if (explore(map, visited, [vertical, horizontal - 1])) {
          locations.push([vertical, horizontal - 1])
        }
      }
    }
    locations.shift()
  }
  return []
}

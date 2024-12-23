export const findPath = (locations: number[][]) => {
  locations.reverse()

  const locationsCopy = Array.from(locations) as number[][] | null[]

  locations.forEach((element, i) => {
    let match = false
    let add = 1

    while (add < locations.length) {
      if (locationsCopy[i]) {
        const next = locationsCopy[i + add]

        if (next && next[0] === element[0]) {
          if (next[1] + 1 === element[1] || next[1] - 1 === element[1]) {
            match = true
          }
        }

        if (next && next[1] === element[1]) {
          if (next[0] + 1 === element[0] || next[0] - 1 === element[0]) {
            match = true
          }
        }
        if (!match) locationsCopy[i + add] = null
      }
      add += 1
    }
  })
  return locationsCopy.filter((location) => location).reverse()
}

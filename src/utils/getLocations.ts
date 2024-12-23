import { PATHS_PER_BLOCK } from '../utils/constants'

export const getLocations = (
  current: number[],
  next: number[],
  following: number[],
  blocks: number
) => {
  const sum =
    next[0] * blocks * PATHS_PER_BLOCK +
    next[0] * PATHS_PER_BLOCK +
    next[1] * PATHS_PER_BLOCK

  switch (current[0] - following[0]) {
    case 2:
      return [
        [sum + 7, ''],
        [sum + 4, ''],
        [sum + 1, ''],
      ]
    case 1:
      if (following[1] < current[1]) {
        if (following[1] === next[1]) {
          return [
            [sum + 5, ''],
            [sum + 4, '0 0 0 50%'],
            [sum + 1, ''],
          ]
        } else {
          return [
            [sum + 7, ''],
            [sum + 4, '0 50% 0 0'],
            [sum + 3, ''],
          ]
        }
      }
      if (following[1] > current[1]) {
        if (following[1] === next[1]) {
          return [
            [sum + 3, ''],
            [sum + 4, '0 0 50% 0'],
            [sum + 1, ''],
          ]
        } else {
          return [
            [sum + 7, ''],
            [sum + 4, '50% 0 0 0'],
            [sum + 5, ''],
          ]
        }
      }
      break
    case 0:
      if (following[1] < next[1]) {
        return [
          [sum + 5, ''],
          [sum + 4, ''],
          [sum + 3, ''],
        ]
      } else {
        return [
          [sum + 3, ''],
          [sum + 4, ''],
          [sum + 5, ''],
        ]
      }
    case -1:
      if (following[1] < current[1]) {
        if (following[1] === next[1]) {
          return [
            [sum + 5, ''],
            [sum + 4, '50% 0 0 0'],
            [sum + 7, ''],
          ]
        } else {
          return [
            [sum + 1, ''],
            [sum + 4, '0 0 50% 0'],
            [sum + 3, ''],
          ]
        }
      }
      if (following[1] > current[1]) {
        if (following[1] === next[1]) {
          return [
            [sum + 3, ''],
            [sum + 4, '0 50% 0 0'],
            [sum + 7, ''],
          ]
        } else {
          return [
            [sum + 1, ''],
            [sum + 4, '0 0 0 50%'],
            [sum + 5, ''],
          ]
        }
      }
      break
    case -2:
      return [
        [sum + 1, ''],
        [sum + 4, ''],
        [sum + 7, ''],
      ]
  }
  return [[0, '']]
}

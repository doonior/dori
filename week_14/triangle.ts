function minimumTotal(triangle: number[][]): number {
  const cache = new Map();
  const solution = (index: number, depth: number) => {
    if (depth === triangle.length - 1) {
      return triangle[depth][index];
    }

    const cacheIndex = (depth * depth + depth) / 2 + index;
    if (cache.get(cacheIndex) !== undefined) {
      return cache.get(cacheIndex);
    }

    const res =
      triangle[depth][index] +
      Math.min(solution(index, depth + 1), solution(index + 1, depth + 1));

    cache.set(cacheIndex, res);
    return res;
  };

  return solution(0, 0);
}

/**
 * 0, 0 -> 0
 * 1, 0 -> 1
 * 1, 1 -> 2
 * 2, 0 -> 3
 * 2, 1 -> 4
 * 2, 2 -> 5
 * 3, 0 -> 6
 */

// (depth)(depth + 1) / 2 + index

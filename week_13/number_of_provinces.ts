function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const arr = Array(n)
    .fill(0)
    .map((_, i) => i);

  const find = (i: number): number => {
    if (arr[i] === i) return i;
    return find(arr[i]);
  };

  const union = (i: number, j: number): void => {
    const root_i = find(i);
    const root_j = find(j);
    if (root_i !== root_j) {
      arr[root_i] = root_j;
    }
  };

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j] && arr[i] !== arr[j]) {
        union(i, j);
      }
    }
  }

  return new Set(arr.map(find)).size;
}

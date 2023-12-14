function canCompleteCircuit(gas: number[], cost: number[]): number {
  const n = gas.length;

  let sum = 0;
  let min = Infinity;
  let minIdx = -1;
  for (let i = 0; i < n; i++) {
    sum = sum + gas[i] - cost[i];
    if (sum < min) {
      minIdx = i;
      min = sum;
    }
  }

  if (min > 0) return 0;

  sum = 0;
  min = Infinity;
  let cur = minIdx;
  for (let i = 0; i < n; i++) {
    cur = (cur + 1) % n;
    sum = sum + gas[cur] - cost[cur];
    if (sum < min) min = sum;
  }
  if (sum < 0) return -1;
  return (minIdx + 1) % n;
}

// solution2
function canCompleteCircuit2(gas: number[], cost: number[]): number {
  const n = gas.length;

  let sum = 0;
  let min = Infinity;
  let minIdx = -1;
  for (let i = 0; i < n; i++) {
    sum = sum + gas[i] - cost[i];
    if (sum < min) {
      minIdx = i;
      min = sum;
    }
  }

  if (sum < 0) return -1;
  if (min > 0) return 0;
  return (minIdx + 1) % n;
}

function reachNumber(target: number): number {
  target = Math.abs(target);
  let n = Math.ceil(Math.sqrt(2 * target + 1 / 4) - 1 / 2);

  let sumDouble = n * n + n;

  if (sumDouble === 2 * target) {
    return n;
  }
  while (true) {
    sumDouble = n * n + n;
    const offset = target - sumDouble / 2;
    if (offset % 2) {
      n += 1;
      continue;
    }
    return n;
  }
}

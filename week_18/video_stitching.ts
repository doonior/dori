function videoStitching(clips: number[][], time: number): number {
  clips.sort((a, b) =>
    a[0] === b[0] ? (a[1] < b[1] ? 1 : -1) : a[0] > b[0] ? 1 : -1,
  );

  const maxMap = clips.reduce(
    (acc, [start, end]) => (acc.get(start) ? acc : (acc.set(start, end), acc)),
    new Map(),
  );

  let head = 0,
    tail = 0;
  let cnt = 0;

  while (tail < time) {
    let max = 0;
    for (let i = head; i <= tail; i++) {
      if (!maxMap.get(i) || maxMap.get(i) <= max) continue;
      max = maxMap.get(i);
    }
    if (max === tail) return -1;
    head = tail;
    tail = max;
    cnt += 1;
  }
  return cnt;
}

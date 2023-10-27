function solution(cap, n, deliveries, pickups) {
  let res = 0;

  const itemList = [deliveries, pickups];
  const idxList = [[], []];
  for (let i = 0; i < deliveries.length; i++) {
    if (deliveries[i]) idxList[0].push(i);
    if (pickups[i]) idxList[1].push(i);
  }

  const indices = [idxList[0].length - 1, idxList[1].length - 1];

  while (indices[0] >= 0 || indices[1] >= 0) {
    res +=
      Math.max(
        (idxList[0][indices[0]] ?? -1) + 1,
        (idxList[1][indices[1]] ?? -1) + 1
      ) * 2;

    for (let i = 0; i < 2; i++) {
      let cur = cap;

      while (indices[i] >= 0 && cur > 0) {
        const idx = idxList[i][indices[i]];
        if (itemList[i][idx] <= cur) {
          cur -= itemList[i][idx];
          itemList[i][idx] = 0;
          indices[i]--;
        } else {
          itemList[i][idx] -= cur;
          cur = 0;
        }
      }
    }
  }

  return res;
}

const distance = (source: string, dest: string) => {
  let count = 0;
  for (let i = 0; i < source.length; i++) {
    count += source[i] === dest[i] ? 0 : 1;
  }
  return count;
};

function minMutation(
  startGene: string,
  endGene: string,
  bank: string[],
): number {
  let answer = -1;
  const queue: Array<[number, number]> = [];
  let endIdx = -1;

  for (let i = 0; i < bank.length; i++) {
    if (bank[i] === endGene) {
      endIdx = i;
    }
    if (distance(startGene, bank[i]) === 1) {
      queue.push([i, 1 << i]);
    }
  }

  if (endIdx === -1) return answer;

  const graph = new Array(bank.length).fill(0);

  for (let i = 0; i < bank.length - 1; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      if (distance(bank[i], bank[j]) === 1) {
        graph[i] |= 1 << j;
        graph[j] |= 1 << i;
      }
    }
  }

  let visited = 0;

  while (queue.length) {
    let [idx, set] = queue.shift();
    if (idx === endIdx) {
      let cnt = 0;
      while (set > 0) {
        cnt += set % 2 ? 1 : 0;
        set = Math.floor(set / 2);
      }
      return cnt;
    }

    for (let cur = 0; cur < bank.length; cur++) {
      const next = 1 << cur;
      if (!(graph[idx] & next)) continue;
      if (visited & next) continue;
      if (next & set) continue;

      queue.push([cur, set | next]);
      visited |= next;
    }
  }

  return -1;
}

class MinHeap<T> {
  arr: Array<T> = [];
  cmp: (a: T, b: T) => boolean;
  constructor(cmp: (a: T, b: T) => boolean) {
    this.cmp = cmp;
  }
  swap(a: number, b: number) {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
  }
  bubbleUp() {
    let cur = this.arr.length - 1;

    while (cur > 0) {
      let parent = Math.floor((cur - 1) / 2);
      if (this.cmp(this.arr[parent], this.arr[cur])) {
        return;
      }
      this.swap(parent, cur);
      cur = parent;
    }
  }
  bubbleDown() {
    let cur = 0;
    const last = Math.floor(this.arr.length / 2 - 1);

    while (cur <= last) {
      let min = cur;
      const right = (cur + 1) * 2;
      if (right < this.arr.length) {
        if (this.cmp(this.arr[right], this.arr[cur])) {
          min = right;
        }
      }
      const left = cur * 2 + 1;
      if (this.cmp(this.arr[left], this.arr[min])) {
        min = left;
      }

      if (min === cur) return;
      this.swap(cur, min);
      cur = min;
    }
  }

  isEmpty() {
    return this.arr.length === 0;
  }

  pop() {
    this.swap(0, this.arr.length - 1);
    const ret = this.arr.pop();
    this.bubbleDown();
    return ret;
  }

  push(node: T) {
    this.arr.push(node);
    this.bubbleUp();
  }
}

// Dijkstra
type Delay = [number, number];

function networkDelayTime(times: number[][], n: number, k: number): number {
  const heap = new MinHeap<Delay>((a, b) => b[1] - a[1] >= 0);

  const graph = Array(n + 1)
    .fill(0)
    .map(() => []);

  for (let edge of times) {
    graph[edge[0]].push(edge);
  }

  const delays = Array(n + 1).fill(Infinity);
  delays[k] = 0;

  heap.push([k, 0]);

  while (!heap.isEmpty()) {
    const [v, w] = heap.pop();
    if (w > delays[v]) {
      continue;
    }

    for (const [_, target, weight] of graph[v]) {
      if (delays[target] > delays[v] + weight) {
        delays[target] = delays[v] + weight;
        heap.push([target, delays[target]]);
      }
    }
  }

  delays[0] = 0;
  const max = Math.max(...delays);
  return max === Infinity ? -1 : max;
}

// Floyd-Warshall
//
const create2DArray = (n: number) =>
  Array(n + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(Infinity));

function networkDelayTimeFW(times: number[][], n: number, k: number): number {
  const cur = create2DArray(n);
  for (let i = 1; i < n + 1; i++) {
    cur[i][i] = 0;
  }
  for (let [u, v, w] of times) {
    cur[u][v] = w;
  }

  for (let h = 1; h < n + 1; h++) {
    for (let i = 1; i < n + 1; i++) {
      if (h === i) continue;
      for (let j = 1; j < n + 1; j++) {
        if (j === i || h === j) continue;
        if (cur[i][h] === Infinity || cur[h][j] === Infinity) continue;
        if (cur[i][j] > cur[i][h] + cur[h][j]) {
          cur[i][j] = cur[i][h] + cur[h][j];
        }
      }
    }
  }

  for (let i = 1; i < n + 1; i++) {
    if (cur[k][i] === Infinity) return -1;
  }
  cur[k][0] = 0;
  return Math.max(...cur[k]);
}

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

type Point = [number, number];
type Edge = [number, number]; // index, distance

const dist = (a: Point, b: Point) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

function minCostConnectPoints(points: Point[]): number {
  let ans = 0;
  const heap = new MinHeap<Edge>((a, b) => b[1] - a[1] >= 0);
  const set = new Set();
  heap.push([0, 0]);
  const dists = Array(points.length).fill(Infinity);
  dists[0] = 0;

  while (!heap.isEmpty() && set.size < points.length) {
    const [cur, value] = heap.pop();
    if (set.has(cur)) continue;
    set.add(cur);
    ans += value;

    points.forEach((v, i) => {
      if (set.has(i)) return;
      if (i === cur) return;
      heap.push([i, dist(points[cur], v)]);
    });
  }

  return ans;
}

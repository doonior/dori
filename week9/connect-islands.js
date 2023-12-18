class PrimaryQueue {
  queue;
  cmpFn;

  constructor(cmpFn) {
    this.queue = [];
    this.cmpFn = cmpFn;
  }

  swap(i, j) {
    const tmp = this.queue[j];
    this.queue[j] = this.queue[i];
    this.queue[i] = tmp;
  }

  bubbleUp() {
    let i = this.queue.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.cmpFn(this.queue[i], this.queue[parent])) {
        this.swap(i, parent);
        i = parent;
        continue;
      }
      break;
    }
  }

  bubbleDown() {
    let i = 0;
    while (i < this.queue.length - 1) {
      let minIdx = i;
      if (
        i * 2 + 1 < this.queue.length &&
        this.cmpFn(this.queue[i * 2 + 1], this.queue[i])
      ) {
        minIdx = i * 2 + 1;
      }
      if (
        i * 2 + 2 < this.queue.length &&
        this.cmpFn(this.queue[i * 2 + 2], this.queue[minIdx])
      ) {
        minIdx = i * 2 + 2;
      }
      if (minIdx === i) {
        break;
      }

      this.swap(i, minIdx);
      i = minIdx;
    }
  }

  push(node) {
    this.queue.push(node);
    this.bubbleUp();
  }

  pop() {
    if (this.queue.length !== 1) {
      const ret = this.queue[0];
      this.queue[0] = this.queue.pop();
      this.bubbleDown();

      return ret;
    }

    return this.queue.pop();
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}

function solution(n, costs) {
  let answer = 0;
  const graph = new Map();
  const set = new Set();

  for (let i = 0; i < costs.length; i++) {
    const [first, second, cost] = costs[i];
    if (graph.get(first)) {
      graph.get(first).push([second, cost]);
    } else {
      graph.set(first, [[second, cost]]);
    }
    if (graph.get(second)) {
      graph.get(second).push([first, cost]);
    } else {
      graph.set(second, [[first, cost]]);
    }
  }

  const prq = new PrimaryQueue((a, b) => b[1] > a[1]);

  const cur = graph.get(0);
  for (let i = 0; i < cur.length; i++) {
    prq.push(cur[i]);
  }
  set.add(0);

  while (!prq.isEmpty()) {
    const [dest, cost] = prq.pop();
    if (set.has(dest)) {
      continue;
    }
    set.add(dest);
    answer += cost;
    if (set.size === n) {
      return answer;
    }

    const nodes = graph.get(dest);

    for (let i = 0; i < nodes.length; i++) {
      prq.push(nodes[i]);
    }
  }

  return answer;
}

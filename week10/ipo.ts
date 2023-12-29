class PrQueue<T> {
  #inst = [null];
  cmp: (a: T, b: T) => number;

  constructor(cmp: (a: T, b: T) => number) {
    this.cmp = cmp;
  }

  size() {
    return this.#inst.length - 1;
  }

  push(val: T) {
    this.#inst.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) {
      return null;
    }
    this.swap(1, this.size());
    const ret = this.#inst.pop();
    this.bubbleDown();
    return ret;
  }

  swap(a: number, b: number) {
    [this.#inst[a], this.#inst[b]] = [this.#inst[b], this.#inst[a]];
  }
  bubbleUp() {
    let cur = this.size();

    while (cur > 1) {
      let parent = Math.floor(cur / 2);
      if (this.cmp(this.#inst[parent], this.#inst[cur]) > 0) {
        break;
      }
      this.swap(cur, parent);
      cur = parent;
    }
  }
  bubbleDown() {
    let cur = 1;

    while (cur <= this.size() / 2) {
      let max = cur;
      const right = cur * 2 + 1;
      if (right <= this.size()) {
        if (this.cmp(this.#inst[right], this.#inst[cur]) > 0) {
          max = right;
        }
      }
      const left = cur * 2;
      if (this.cmp(this.#inst[left], this.#inst[max]) > 0) {
        max = left;
      }
      if (max === cur) break;
      this.swap(max, cur);
      cur = max;
    }
  }
}

/**
    1. 같은 capital이면 최대값을 골라야함.
    2. profit을 소모하지는 않음.
    3. 같은 profit이면 큰 capital부터 가도 됨
 */
function findMaximizedCapital(
  k: number,
  w: number,
  profits: number[],
  capital: number[],
): number {
  // capital로 정렬
  const works = capital
    .map((cap, i) => [cap, profits[i]])
    .sort((a, b) => b[0] - a[0]);

  // profit으로 정렬, capital로 정렬
  const candidates = new PrQueue<number>((a, b) => a - b);

  for (let i = 0; i < k; i++) {
    while (works.length > 0 && works[works.length - 1][0] <= w) {
      candidates.push(works.pop()[1]);
    }
    w += candidates.pop() ?? 0;
  }

  return w;
}

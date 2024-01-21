const Direction = {
  R: "R",
  L: "L",
  N: ".",
} as const;
type Direction = (typeof Direction)[keyof typeof Direction];
type LR = typeof Direction.L | typeof Direction.R;

const Delta = { [Direction.R]: 1, [Direction.L]: -1 } as const;
const CounterDir = {
  [Direction.R]: Direction.L,
  [Direction.L]: Direction.R,
} as const;
const Bit = { [Direction.N]: 0, [Direction.R]: 1, [Direction.L]: 2 } as const;

const encode = (domino: string) => Bit[domino];
const decode = (x: number) =>
  x === Bit[Direction.R]
    ? Direction.R
    : x === Bit[Direction.L]
      ? Direction.L
      : Direction.N;

const lt = (i: number, n: number) => i < n;
const gte = (i: number, n: number) => i >= n;

const mark = (dir: LR, dominoes: string, ans: number[]) => {
  const isForward = dir === Direction.R;
  const { start, end, cmp } = isForward
    ? {
        start: 0,
        end: dominoes.length,
        cmp: lt,
      }
    : {
        start: dominoes.length - 1,
        end: 0,
        cmp: gte,
      };

  let shouldMark = false;
  for (let i = start; cmp(i, end); i += Delta[dir]) {
    if (dominoes[i] === CounterDir[dir]) {
      shouldMark = false;
      continue;
    }
    if (dominoes[i] === dir) {
      shouldMark = true;
      continue;
    }
    if (!shouldMark) continue;
    ans[i] |= Bit[dir];
  }
};

function pushDominoes(dominoes: string): string {
  const n = dominoes.length;
  const ans: number[] = Array<number>(n)
    .fill(0)
    .map((_, i) => encode(dominoes[i]));

  mark(Direction.R, dominoes, ans);
  mark(Direction.L, dominoes, ans);
  const Both = Bit[Direction.R] | Bit[Direction.L];

  let i = 0;
  while (i < n) {
    if (ans[i] !== Both) {
      i++;
      continue;
    }

    let start = i;
    while (i < n && ans[i] === Both) {
      i++;
    }
    let end = i - 1;
    const mid = (start + end) / 2;
    let j = start;
    while (j <= end) {
      ans[j] =
        j < mid
          ? Bit[Direction.R]
          : j >= Math.floor(mid + 1)
            ? Bit[Direction.L]
            : ans[j];
      j++;
    }
    i = end + 1;
  }

  return ans.map(decode).join("");
}

/**
 * RRR -> RRR
 * RR. -> RRR
 * .RR -> .RR
 */
// 정방향 -> R에 대해서 .에 마킹
// 역방향 -> L에 대해서 .에 마킹
// 모두 마킹 후, 겹치는 부분에 대해, 반 가르기

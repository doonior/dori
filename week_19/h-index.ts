const countOver = (list: number[], h: number) =>
  list.filter((c) => c >= h).length;

const binarySearch = (l: number, r: number, mid: number, list: number[]) =>
  countOver(list, mid) >= mid ? find(mid, r, list) : find(l, mid - 1, list);

const find = (l: number, r: number, list: number[]) =>
  l >= r ? l : binarySearch(l, r, Math.ceil((l + r) / 2), list);

const hIndex = (citations: number[]): number =>
  find(0, Math.max(...citations), citations);

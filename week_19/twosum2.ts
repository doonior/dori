const getValue = (list: number[], i: number, j: number) => list[i] + list[j];

const find = (list: number[], target: number, i: number, j: number, recur) =>
  recur(list, target, i, j, getValue(list, i, j), recur);

const twoSum = (numbers: number[], target: number): number[] =>
  find(
    numbers,
    target,
    0,
    numbers.length - 1,
    (
      list: number[],
      target: number,
      i: number,
      j: number,
      value: number,
      recur,
    ) =>
      value === target
        ? [i + 1, j + 1]
        : value < target
          ? find(list, target, i + 1, j, recur)
          : find(list, target, i, j - 1, recur),
  );

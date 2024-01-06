function partitionString(s: string): number {
  if (s.length === 1) {
    return 1;
  }
  let i = 0,
    j = 1;
  let cnt = 0;

  while (j < s.length) {
    for (let k = i; k < j; k++) {
      if (s[j] === s[k]) {
        i = j;
        cnt += 1;
        break;
      }
    }
    j += 1;
  }

  return cnt + 1;
}

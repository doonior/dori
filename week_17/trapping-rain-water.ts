function trap(height: number[]): number {
  let ans = 0;
  const n = height.length;

  const sorted = height.map((h, i) => [h, i]).sort((a, b) => a[0] - b[0]);

  const root = sorted.pop();
  let l = root[1] - 1;
  let r = root[1] + 1;

  while (sorted.length) {
    const [h, i] = sorted.pop();
    if (i < r && i > l) continue;

    if (i >= r) {
      for (let j = r; j < i; j++) {
        ans += h - height[j];
      }
      r = i + 1;
      continue;
    }

    if (i <= l) {
      for (let j = i + 1; j <= l; j++) {
        ans += h - height[j];
      }
      l = i - 1;
    }
  }

  return ans;
}

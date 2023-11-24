function findMinArrowShots(points: number[][]): number {
  if (points.length === 1) return 1;
  points.sort((a, b) => a[1] - b[1]);
  let ans = 0;
  let i = 0,
    j = 1;

  while (i < points.length) {
    if (j < points.length && points[j][0] <= points[i][1]) {
      // console.log(points[i], points[j])
      j++;
      continue;
    }
    i = j;
    j++;
    ans += 1;
  }
  return ans;
}

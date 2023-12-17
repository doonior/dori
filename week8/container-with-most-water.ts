function maxArea(height: number[]): number {
  let l = 0,
    r = height.length - 1;
  let lmax = -1,
    rmax = -1;
  let ans = -1;
  while (l < r) {
    if (rmax >= height[r]) {
      r--;
      continue;
    }
    if (lmax >= height[l]) {
      l++;
      continue;
    }
    if (height[l] >= height[r]) {
      ans = Math.max(ans, height[r] * (r - l));
      rmax = height[r];
      r--;
    } else {
      ans = Math.max(ans, height[l] * (r - l));
      lmax = height[l];
      l++;
    }
  }
  return ans;
}

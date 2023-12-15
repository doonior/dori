function maxArea(height: number[]): number {
  let l = 0,
    r = height.length - 1;
  let ans = -1;
  while (l < r) {
    if (height[l] >= height[r]) {
      ans = Math.max(ans, height[r] * (r - l));
      r--;
    } else {
      ans = Math.max(ans, height[l] * (r - l));
      l++;
    }
  }
  return ans;
}

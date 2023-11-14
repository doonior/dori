function minSubArrayLen(target: number, nums: number[]): number {
  let ans = Infinity,
    val = 0,
    i = 0,
    j = 0;
  while (i < nums.length) {
    if (val >= target) {
      ans = Math.min(ans, j - i);
      val -= nums[i++];
      continue;
    }
    if (j === nums.length) {
      break;
    }
    val += nums[j++];
  }
  return ans === Infinity ? 0 : ans;
}

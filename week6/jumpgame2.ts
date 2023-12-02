function jump(nums: number[]): number {
  let cnt = 0,
    i = 0,
    j = nums.length - 1;

  while (j > 0) {
    if (nums[i] >= j - i) {
      cnt += 1;
      j = i;
      i = 0;
      continue;
    }
    i += 1;
  }

  return cnt;
}

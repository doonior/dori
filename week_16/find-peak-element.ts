function findPeakElement(nums: number[]): number {
  nums[-1] = nums[nums.length] = -Infinity;

  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (nums[mid] < nums[mid + 1]) {
      l = mid + 1;
      continue;
    }

    if (nums[mid] < nums[mid - 1]) {
      r = mid - 1;
      continue;
    }

    return mid;
  }
}

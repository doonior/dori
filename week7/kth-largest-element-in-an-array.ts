function findKthLargest(nums: number[], k: number): number {
  let l = -10000,
    r = 10000;
  let mid;

  while (l < r) {
    mid = Math.ceil((l + r) / 2);

    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] >= mid) {
        count += 1;
      }
    }

    if (count >= k) {
      l = mid;
    } else if (count < k) {
      r = mid - 1;
    }
  }

  return r;
}

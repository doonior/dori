function removeDuplicates(nums: number[]): number {
  if (nums.length < 3) return nums.length;
  let sorted = 0,
    count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[sorted]) {
      count += 1;
    } else {
      count = 1;
    }
    if (count <= 2) {
      sorted += 1;
      nums[sorted] = nums[i];
    }
  }

  return sorted + 1;
}

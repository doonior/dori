function canJump(nums: number[]): boolean {
  if (nums.length === 1) return true;
  let limit = nums[0];

  for (let i = 0; i < nums.length; i++) {
    if (i === limit) {
      if (nums[i] === 0) return false;
    }
    limit = Math.max(limit, i + nums[i]);
    if (limit >= nums.length - 1) return true;
  }

  return false;
}

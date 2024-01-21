function productExceptSelf(nums: number[]): number[] {
  let zeroCount = nums.reduce((acc, cur) => (acc += !cur ? 1 : 0), 0);
  if (zeroCount >= 2) {
    return nums.fill(0);
  }
  if (zeroCount === 1) {
    const prod = nums.reduce((acc, cur) => (acc *= !cur ? 1 : cur), 1);
    return nums.map((x) => (x ? 0 : prod));
  }

  const prod = nums.reduce((acc, cur) => (acc *= cur), 1);
  return nums.map((x) => prod / x);
}

function sortArray(nums: number[]): number[] {
  const swap = (i: number, j: number) => {
    const tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
  };

  const quickSort = (start: number, end: number) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    let tmp = nums[mid];
    nums[mid] = nums[start];
    nums[start] = tmp;

    let j = start;
    for (let i = start + 1; i <= end; i++) {
      if (nums[i] < nums[start]) {
        j++;
        tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
      }
    }

    tmp = nums[start];
    nums[start] = nums[j];
    nums[j] = tmp;
    quickSort(start, j - 1);
    quickSort(j + 1, end);
  };

  quickSort(0, nums.length - 1);

  return nums;
}

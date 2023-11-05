/**
 *
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  if (n === 0) return;

  let i = m - 1,
    j = n - 1,
    k = m + n - 1;

  for (k; k >= 0; k--) {
    if (j < 0 && i >= 0) {
      return;
    }
    if (j >= 0 && i < 0) {
      for (let h = j; h >= 0; h--) {
        nums1[h] = nums2[h];
      }
      return;
    }

    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i];
      i -= 1;
    } else {
      nums1[k] = nums2[j];
      j -= 1;
    }
  }
}

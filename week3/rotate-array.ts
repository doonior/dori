
/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    if (nums.length === 1) return

    let tmp = 0;
    const n = nums.length;
    k = k % n;

    const direction = k > n / 2 ? 'l' : 'r';
    k = direction === 'l' ? n - k : k;

    const flip = (i: number, j: number) => {
        for (let k = 0; k < (j - i + 1) / 2; k++) {
            tmp = nums[i + k];
            nums[i + k] = nums[j - k];
            nums[j - k] = tmp;
        }
    }

    const swap = () => {
        for(let i = 0; i < k; i++) {
            tmp = nums[i];
            nums[i] = nums[n - 1 - i];
            nums[n - 1 - i] = tmp;
        }
    }

    if (direction === 'r') {
        flip(n - k, n - 1);
        flip(k, n - 1 - k);
        swap();
        flip(k, n - 1);
    } else {
        flip(0, k - 1);
        flip(k, n - 1 - k);
        swap();
        flip(0, n - k - 1);
    }
};



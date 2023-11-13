function maxProfit(prices: number[]): number {
  let ans = 0;
  let j = prices[0];
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] - prices[i] < 0) {
      ans += prices[i] - j;
      j = prices[i + 1];
    }
  }
  ans += prices[prices.length - 1] - j;

  return ans;
}

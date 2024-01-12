function candy(ratings: number[]): number {
  const candies = Array(ratings.length).fill(1);

  for (let i = 0; i < ratings.length; i++) {
    if (
      i < ratings.length - 1 &&
      ratings[i + 1] < ratings[i] &&
      candies[i + 1] >= candies[i]
    ) {
      candies[i] = candies[i + 1] + 1;

      while (
        i > 0 &&
        ratings[i - 1] > ratings[i] &&
        candies[i - 1] <= candies[i]
      ) {
        candies[i - 1] = candies[i] + 1;
        i -= 1;
      }
    }
    if (i > 0 && ratings[i - 1] < ratings[i] && candies[i - 1] >= candies[i]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  return candies.reduce((acc, cur) => acc + cur, 0);
}

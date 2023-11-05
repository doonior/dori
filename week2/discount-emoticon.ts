const percents = [10, 20, 30, 40];

function solution(users, emoticons) {
  let max_plus = 0;
  let max_profit = 0;

  const discounts = new Array(emoticons.length).fill(0);

  const calc = () => {
    let plus = 0,
      profit = 0;
    for (let user of users) {
      let pay = 0;
      for (let e = 0; e < emoticons.length; e++) {
        let discount = percents[discounts[e]];
        if (discount >= user[0]) {
          pay += emoticons[e] * (1 - discount / 100);
        }
        if (pay >= user[1]) {
          plus += 1;
          pay = 0;
          break;
        }
      }
      profit += pay;
    }

    if (plus > max_plus) {
      max_plus = plus;
      max_profit = profit;
    }
    if (plus === max_plus) {
      max_profit = Math.max(profit, max_profit);
    }
  };

  const dfs = (i) => {
    if (i === emoticons.length) {
      calc();
      return;
    }

    for (let j = 0; j < percents.length; j++) {
      discounts[i] = j;
      dfs(i + 1);
    }
  };

  dfs(0);

  return [max_plus, max_profit];
}

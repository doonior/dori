const input = `103000509
002109400
000704000
300502006
060000050
700803004
000401000
009205800
804000107`;

const input2 = `000000000
000000000
000000000
000000000
000000000
000000000
000000000
000000000
000000000`;

const range = [
  [
    [1, 2],
    [0, 2],
    [0, 1],
  ],
  [
    [4, 5],
    [3, 5],
    [3, 4],
  ],
  [
    [7, 8],
    [6, 8],
    [6, 7],
  ],
];

const getBoxRange = (i: number) =>
  i < 3 ? range[0][i] : i < 6 ? range[1][i - 3] : range[2][i - 6];

const filterValue = (rows: string[][], r: number, c: number) => {
  const values = Array(10).fill(false);
  values[0] = true;
  for (let i = 0; i < 9; i++) {
    if (rows[i][c] !== '0') {
      values[rows[i][c]] = true;
    }
    if (rows[r][i] !== '0') {
      values[rows[r][i]] = true;
    }
  }

  for (let row of getBoxRange(r)) {
    for (let col of getBoxRange(c)) {
      if (rows[row][col] !== '0') {
        values[rows[row][col]] = true;
      }
    }
  }
  return Object.keys(values).filter((x) => !values[x]);
};

const convert2DInput = (input: string) =>
  input.split('\n').map((s) => s.split(''));

const solution = (input: string) => {
  const zeros: any[] = [];
  const answer = convert2DInput(input);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (answer[r][c] === '0') {
        zeros.push([r, c]);
      }
    }
  }

  const bt = (idx: number) => {
    const [r, c] = zeros[idx];

    const cands = filterValue(answer, r, c);
    if (cands.length === 0) return false;

    for (let i = 0; i < cands.length; i++) {
      answer[r][c] = cands[i];
      if (idx === zeros.length - 1) {
        return true;
      }

      const ret = bt(idx + 1);
      if (ret) return true;
    }
    answer[r][c] = '0';
    return false;
  };

  bt(0);
  return answer;
};

// console.log(solution(input2));
solution(input2).map((i) => console.log(i.join('')));

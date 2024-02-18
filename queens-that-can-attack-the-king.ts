const dr = [-1, -1, -1, 0, 1, 1, 1, 0];
const dc = [-1, 0, 1, 1, 1, 0, -1, -1];

function queensAttacktheKing(queens: number[][], [c, r]: number[]): number[][] {
  const ans = [];
  const board = Array(8)
    .fill(undefined)
    .map(() => Array(8).fill(0));

  for (let [qc, qr] of queens) {
    board[qr][qc] = 1;
  }

  for (let dir = 0; dir < 8; dir++) {
    let nr = r,
      nc = c;
    while (true) {
      nr += dr[dir];
      nc += dc[dir];

      if (nr < 0 || nc < 0 || nr >= 8 || nc >= 8) break;
      if (!board[nr][nc]) continue;

      ans.push([nc, nr]);
      break;
    }
  }

  return ans;
}

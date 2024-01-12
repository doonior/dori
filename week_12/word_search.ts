const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];

function exist(board: string[][], word: string): boolean {
  const n = board.length;
  const m = board[0].length;

  const searchWord = (
    r: number,
    c: number,
    idx: number,
    visited: boolean[][],
  ) => {
    if (idx >= word.length) return true;

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr < 0 || nc < 0 || nr >= n || nc >= m) continue;
      if (visited[nr][nc]) continue;
      if (board[nr][nc] !== word[idx]) continue;

      visited[nr][nc] = true;
      const ans = searchWord(nr, nc, idx + 1, visited);
      if (ans) return true;

      visited[nr][nc] = false;
    }

    return false;
  };

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (board[r][c] !== word[0]) continue;
      const visited = Array(n)
        .fill(undefined)
        .map(() => Array(m).fill(false));
      visited[r][c] = true;
      const ans = searchWord(r, c, 1, visited);
      if (ans) return true;
    }
  }

  return false;
}

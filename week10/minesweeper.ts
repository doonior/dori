function updateBoard(board: string[][], [r, c]: number[]): string[][] {
  if (board[r][c] === "M") {
    board[r][c] = "X";
    return board;
  }
  const width = board[0].length;
  const height = board.length;

  const countAdjacent = (r: number, c: number) => {
    let count = 0;
    for (let i = r - 1; i < r + 2; i++) {
      if (i < 0 || i >= height) continue;
      for (let j = c - 1; j < c + 2; j++) {
        if (j < 0 || j >= width) continue;
        count += board[i][j] === "M" ? 1 : 0;
      }
    }
    return count;
  };

  const clickEmptySquare = (r: number, c: number) => {
    const count = countAdjacent(r, c);
    if (count) {
      board[r][c] = `${count}`;
      return board;
    }

    board[r][c] = "B";
    for (let i = r - 1; i < r + 2; i++) {
      if (i < 0 || i >= height) continue;
      for (let j = c - 1; j < c + 2; j++) {
        if (j < 0 || j >= width) continue;
        if (board[i][j] !== "E") continue;
        clickEmptySquare(i, j);
      }
    }
  };

  clickEmptySquare(r, c);
  return board;
}

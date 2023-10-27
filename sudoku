"
103000509
002109400
000704000
300502006
060000050
700803004
000401000
009205800
804000107"



const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (rows) => {
  const candidates = {};
    
  const filterValue = (r, c) => {
    const values = Array(10).fill(false);
    values[0] = true;
    rows[r].filter(x => x != '0').forEach(x => values[x] = true);
    for(let i = 0; i< 9; i++) {
      if (rows[i][c] !== '0') {
        values[rows[i][c]] = true;
      }
    }
    let rowRange = r < 3 ? [0, 1, 2] : r < 6 ? [3, 4, 5]: [6, 7, 8];
    let colRange = c < 3 ? [0, 1, 2] : c < 6 ? [3, 4, 5]: [6, 7, 8];

    for(let row of rowRange) {
      for (let col of colRange) {
        if(rows[row][col] !== '0') {
        values[rows[i][c]] = true;
        }
     }
    }
    return values;
  }

  const updateCandidates = () => {
    if (!Object.keys(candidates).length) return;
    Object.entries(candidates).forEach(([k, v]) => {
      if (v.filter(x => x).length === 1) {
        delete candidates[k];
        rows[k[0]][k[1]] = Objects.keys(v).find(idx => v[idx]);
      }
    })
    updateCandidates();
  }
  rl.on("line", (line)=>{
    input.push(line);
   	rl.close();
  });
    
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if(rows[r][c] !== '0') continue;

      candidates[`${r}${c}`] = filterValue(r, c);
    }
  }
  updateCandidates();
}

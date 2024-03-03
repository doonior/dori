function solution(n, paths, gates, summits) {
  let answer = Infinity;
  let minIntensity = Infinity;

  const summitsSet = new Set(summits);
  const gatesSet = new Set(gates);

  const pathMap = {};
  for (let [i, j, w] of paths) {
    if (pathMap[i]) {
      pathMap[i][j] = w;
    } else {
      pathMap[i] = { [j]: w };
    }
    if (pathMap[j]) {
      pathMap[j][i] = w;
    } else {
      pathMap[j] = { [i]: w };
    }
  }

  const dfs = (i, intensity, visited) => {
    if (intensity > minIntensity) return;
    if (summitsSet.has(i)) {
      if (minIntensity > intensity) {
        minIntensity = intensity;
        answer = i;
      }
      if (minIntensity === intensity) {
        answer = Math.min(answer, i);
      }
      return;
    }

    for (let [key, value] of Object.entries(pathMap[i])) {
      if (gatesSet.has(Number(key))) {
        continue;
      }
      if (visited.has(key)) {
        continue;
      }

      visited.add(key);
      dfs(Number(key), Math.max(intensity, value), visited);
      visited.delete(key);
    }
  };

  for (let gate of gates) {
    const visited = new Set();
    visited.add(gate + "");
    dfs(gate, 0, visited);
  }

  return [answer, minIntensity];
}
//         paths
//             .filter((path) => path[0] === i || path[1] === i)
//             .forEach((path) => {
//                 if (gates.includes(path[1])) {
//                     return;
//                 }
//                 if (visited.has(path[1])) {
//                     return;
//                 }
//                 visited.add(path[1]);

//                 dfs(path[1], j, Math.max(intensity, path[2]), visited);

//                 visited.delete(path[1]);
//             });

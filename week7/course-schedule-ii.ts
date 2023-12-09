function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const graph = new Map();
  // const cache = new Map();
  const done = new Set();

  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }

  for (let i = 0; i < prerequisites.length; i++) {
    graph.get(prerequisites[i][0]).push(prerequisites[i][1]);
  }

  const stack = [];

  const dfs = (cur: number, visited: Set<number>): number[] | boolean => {
    // cycle detection
    // memoize result

    if (visited.has(cur)) return false;
    visited.add(cur);

    if (done.has(cur)) {
      visited.delete(cur);
      return true;
    }
    done.add(cur);

    const pre = graph.get(cur);

    for (let i = 0; i < pre.length; i++) {
      const ret = dfs(pre[i], visited);
      if (!ret) return false;
    }
    visited.delete(cur);
    stack.push(cur);

    return true;
  };

  for (let i = 0; i < numCourses; i++) {
    const res = dfs(i, new Set());
    if (!res) return [];
  }

  return stack;
}

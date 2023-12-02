function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph = new Map<number, number[]>();
  const checked = new Array(numCourses).fill(false);
  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }

  prerequisites.forEach(([crs, pre]) => {});

  for (let i = 0; i < prerequisites.length; i++) {
    graph.get(prerequisites[i][1]).push(prerequisites[i][0]);
  }

  const dfs = (cur: number, course: Set<number>) => {
    if (!graph.get(cur)) return true;
    if (course.has(cur)) return false;
    if (checked[cur]) return true;

    course.add(cur);
    for (let j = 0; j < graph.get(cur).length; j++) {
      if (!dfs(graph.get(cur)[j], course)) {
        return false;
      }
    }
    course.delete(cur);
    checked[cur] = true;

    return true;
  };

  for (let i = 0; i < numCourses; i++) {
    if (checked[i]) continue;
    if (!graph.get(i)) continue;
    if (!dfs(i, new Set<number>())) return false;
  }

  return true;
}

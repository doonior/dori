function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  // 1. find path to p and q by dfs
  // 2. lift up lower node until their depths are the same
  // 3. lift up both until the parents are the same.

  const find = (
    cur: TreeNode | null,
    target: TreeNode,
    path: Array<TreeNode>,
  ) => {
    path.push(cur);
    if (cur === target) {
      return path;
    }

    let res = null;
    if (cur.left) {
      res = find(cur.left, target, path);
    }
    if (res) {
      return res;
    }
    if (cur.right) {
      res = find(cur.right, target, path);
    }
    if (res) {
      return res;
    }
    path.pop();
  };

  const pathP = find(root, p, []);
  const pathQ = find(root, q, []);

  while (pathP.length > pathQ.length) {
    pathP.pop();
  }
  while (pathP.length < pathQ.length) {
    pathQ.pop();
  }

  let i = pathP.length - 1;
  while (pathP[i] !== pathQ[i]) {
    i -= 1;
  }
  return pathP[i];
}

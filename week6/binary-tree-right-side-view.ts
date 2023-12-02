function rightSideView(root: TreeNode | null): number[] {
  const ans = [];

  const dfs = (node: TreeNode | null, depth: number) => {
    if (!node) return;
    if (ans[depth] === undefined) {
      ans.push(node.val);
    }
    dfs(node.right, depth + 1);
    dfs(node.left, depth + 1);
  };
  dfs(root, 0);
  return ans;
}

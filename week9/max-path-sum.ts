function maxPathSum(root: TreeNode | null): number {
  let ans = -Infinity;
  const findMax = (node: TreeNode | null) => {
    if (!node) return 0;

    const left = Math.max(findMax(node.left), 0);
    const right = Math.max(findMax(node.right), 0);

    const currentMax = node.val + left + right;
    ans = Math.max(ans, currentMax);

    return node.val + Math.max(left, right);
  };

  findMax(root);
  return ans;
}

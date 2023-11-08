function flatten1(root: TreeNode | null): void {
  const _flatten = (root: TreeNode | null): TreeNode | null => {
    if (!root) return null;

    let right = _flatten(root.right);
    root.right = _flatten(root.left);
    root.left = null;

    let tail = root;
    while (tail.right) {
      tail = tail.right;
    }
    tail.right = right;

    return root;
  };

  _flatten(root);
}

function flatten2(root: TreeNode | null): void {
  const queue = [];

  const preOrder = (root) => {
    if (!root) return;
    queue.push(root);
    preOrder(root.left);
    preOrder(root.right);
  };

  preOrder(root);

  for (let i = 0; i < queue.length - 1; i++) {
    queue[i].left = null;
    queue[i].right = queue[i + 1];
  }
}

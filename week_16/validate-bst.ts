function isValidBST(root: TreeNode | null): boolean {
  const validate = (
    root: TreeNode | null,
    min?: number,
    max?: number,
  ): boolean => {
    if (root.val >= max || root.val <= min) {
      return false;
    }
    if (root.right) {
      if (root.val >= root.right.val) {
        return false;
      }
      if (!validate(root.right, root.val, max)) {
        return false;
      }
    }

    if (root.left) {
      if (root.val <= root.left.val) {
        return false;
      }

      if (!validate(root.left, min, root.val)) {
        return false;
      }
    }

    return true;
  };

  return validate(root);
}

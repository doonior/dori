class Node {
  val: boolean;
  isLeaf: boolean;
  topLeft: Node | null;
  topRight: Node | null;
  bottomLeft: Node | null;
  bottomRight: Node | null;
  constructor(
    val?: boolean,
    isLeaf?: boolean,
    topLeft?: Node,
    topRight?: Node,
    bottomLeft?: Node,
    bottomRight?: Node,
  ) {
    this.val = val === undefined ? false : val;
    this.isLeaf = isLeaf === undefined ? false : isLeaf;
    this.topLeft = topLeft === undefined ? null : topLeft;
    this.topRight = topRight === undefined ? null : topRight;
    this.bottomLeft = bottomLeft === undefined ? null : bottomLeft;
    this.bottomRight = bottomRight === undefined ? null : bottomRight;
  }
}

function forEach(node: Node, fn: (node: Node) => any) {
  fn(node.topLeft);
  fn(node.topRight);
  fn(node.bottomLeft);
  fn(node.bottomRight);
}

function every(node: Node, fn: (node: Node) => boolean) {
  return (
    fn(node.topLeft) &&
    fn(node.topRight) &&
    fn(node.bottomLeft) &&
    fn(node.bottomRight)
  );
}

function mergeLeavesTo(node: Node, value: boolean) {
  node.isLeaf = true;
  node.val = value;
  node.topLeft = null;
  node.topRight = null;
  node.bottomLeft = null;
  node.bottomRight = null;
}

function construct(grid: number[][]): Node | null {
  const quadify = (startRow: number, startCol: number, size: number): Node => {
    if (size === 1) {
      const val = !!grid[startRow][startCol];
      return new Node(val, true);
    }

    const next = size / 2;
    return new Node(
      true,
      false,
      quadify(startRow, startCol, next),
      quadify(startRow, startCol + next, next),
      quadify(startRow + next, startCol, next),
      quadify(startRow + next, startCol + next, next),
    );
  };

  const merge = (node: Node) => {
    if (node.isLeaf) {
      return;
    }

    forEach(node, merge);

    if (!every(node, (child) => child.isLeaf)) {
      return;
    }

    if (every(node, (child) => child.val)) {
      mergeLeavesTo(node, true);
      return;
    }

    if (every(node, (child) => !child.val)) {
      mergeLeavesTo(node, false);
    }
  };

  const root = quadify(0, 0, grid.length);
  merge(root);

  return root;
}

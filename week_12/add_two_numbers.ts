class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  let ans: ListNode = new ListNode();
  const tail = ans;
  let carry = 0;

  while (true) {
    const newVal = carry + (l1?.val || 0) + (l2?.val || 0);

    if (newVal >= 10) {
      carry = 1;
      ans.val = newVal - 10;
    } else {
      carry = 0;
      ans.val = newVal;
    }

    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;

    if (l1 || l2) {
      ans.next = new ListNode();
      ans = ans.next;
      continue;
    }
    if (carry) {
      ans.next = new ListNode(carry, null);
    }
    return tail;
  }
}

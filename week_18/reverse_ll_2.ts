/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    let cur = head;
    let lnode = null, rnode = null;

    while (left > 1) {
        lnode = cur;
        cur = cur.next;
        left--;
        right--;
    }
    const tail = cur;
    while (right > 0) {
        const next = cur.next;
        cur.next = rnode;
        rnode = cur;
        cur = next;
        right--;
    }
    tail.next = cur
    if (lnode) {
     (lnode.next = rnode);   
    } else {
        return rnode;
    }
    return head;
};

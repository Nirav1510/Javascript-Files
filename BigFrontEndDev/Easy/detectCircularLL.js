// https://bigfrontend.dev/problem/detect-circle-in-linked-list

function hasCircle(head) {
  let fast = head;
  let slow = head;

  while (fast && slow) {
    fast = fast.next?.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }

  return false;
}

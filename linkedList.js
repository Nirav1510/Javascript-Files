// QUE. Create a JavaScript class for a linked list with methods to insert a node at the beginning, end, or at a specific position, and to delete a node from a given position

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Insert a node at the beginning
  insertAtBeginning(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Insert a node at the end
  insertAtEnd(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Insert a node at a specific position (0-based index)
  insertAtPosition(data, position) {
    if (position < 0) {
      console.log("Invalid position");
      return;
    }

    if (position === 0) {
      this.insertAtBeginning(data);
      return;
    }

    const newNode = new Node(data);
    let current = this.head;
    let previous = null;
    let currentPosition = 0;

    while (current && currentPosition < position) {
      previous = current;
      current = current.next;
      currentPosition++;
    }

    if (currentPosition !== position) {
      console.log("Position out of bounds");
      return;
    }

    newNode.next = current;
    previous.next = newNode;
  }

  // Delete a node from a given position (0-based index)
  deleteFromPosition(position) {
    if (position < 0 || !this.head) {
      console.log("Invalid position");
      return;
    }

    let current = this.head;

    // If head needs to be removed
    if (position === 0) {
      this.head = current.next;
      current.next = null;
      return;
    }

    let previous = null;
    let currentPosition = 0;

    while (current && currentPosition < position) {
      previous = current;
      current = current.next;
      currentPosition++;
    }

    if (!current) {
      console.log("Position out of bounds");
      return;
    }

    previous.next = current.next;
    current.next = null;
  }

  // Helper method to print the linked list
  printList() {
    let current = this.head;
    let result = "start -> ";
    while (current) {
      result += current.data + " -> ";
      current = current.next;
    }
    result += "end";
    console.log(result);
  }
}

const linkedList = new LinkedList();
linkedList.insertAtEnd(10);
linkedList.insertAtEnd(20);
linkedList.insertAtEnd(30);
linkedList.insertAtBeginning(0);
linkedList.insertAtPosition(25, 3);
linkedList.printList(); // Output: 0 -> 10 -> 20 -> 25 -> 30 -> null

linkedList.deleteFromPosition(3);
linkedList.printList(); // Output: 0 -> 10 -> 20 -> 30 -> null

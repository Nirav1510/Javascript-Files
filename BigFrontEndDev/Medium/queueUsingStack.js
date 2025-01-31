// https://bigfrontend.dev/problem/implement-a-queue-by-using-stack

/* 
class Stack {
  push(element) { // add element to stack }
  peek() { // get the top element }
  pop() { // remove the top element}
  size() { // count of element }
}
*/

/* Array is disabled in your code */

// you need to complete the following Class
class Queue {
	constructor() {
		this.pushStack = new Stack();
		this.popStack = new Stack();
	}

	enqueue(element) {
		// add new element to the rare
		for (let i = 0; i < this.pushStack.size(); i++) {
			this.popStack.push(this.pushStack.pop());
		}

		// now add the element to stack1
		this.pushStack.push(element);

		// transfer back
		for (let i = 0; i < this.popStack.size(); i++) {
			this.pushStack.push(this.popStack.pop());
		}
	}

	peek() {
		// get the head element
		return this.pushStack.peek();
	}

	size() {
		// return count of element
		return this.pushStack.size();
	}

	dequeue() {
		// remove the head element
		return this.pushStack.pop();
	}
}

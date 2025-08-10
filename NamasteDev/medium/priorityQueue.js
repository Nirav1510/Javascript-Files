class PriorityQueue {
	constructor() {
		this.items = [];
	}

	enqueue(value, priority) {
		const newItem = { value, priority };
		let inserted = false;

		for (let i = 0; i < this.items.length; i++) {
			if (priority < this.items[i].priority) {
				this.items.splice(i, 0, newItem);
				inserted = true;
				break;
			}
		}

		if (!inserted) {
			this.items.push(newItem);
		}
	}

	dequeue() {
		if (this.isEmpty()) return null;
		return this.items.shift().value;
	}

	peek() {
		if (this.isEmpty()) return null;
		return this.items[0].value;
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}
}

// Example usage
const pq = new PriorityQueue();
pq.enqueue('task1', 2);
pq.enqueue('task2', 1);
pq.enqueue('task3', 3);

console.log(pq.dequeue()); // Outputs: 'task2' (highest priority)
console.log(pq.peek()); // Outputs: 'task1' (next highest priority)
console.log(pq.size()); // Outputs: 2
console.log(pq.isEmpty()); // Outputs: false
pq.dequeue(); // Removes 'task1'
console.log(pq.size()); // Outputs: 1

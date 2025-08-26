/*

Create a queue that allows concurrent processing of async tasks up until a limit. Tasks can be added to it after creation at any time

type Task = any;

type TaskQueue = (ProcessorFn, OnCompleteFn, concurrency: number) => QueueObject

type QueueObject = {
  push: (Task or Array<Task>) => void
  drain: (CallbackFn) => void
}

type ProcessorFn = (Task, CallbackFn) => void

type CallbackFn = (data: any) => void

type OnCompleteFn = (Task, data: any) => void

*/

class TaskQueue {
	constructor(processorFn, onCompleteFn, limit) {
		this.processorFn = processorFn;
		this.onCompleteFn = onCompleteFn;
		this.maxTask = limit;
		this.queue = [];
		this.activeTask = 0;
		this.drainCb;
	}

	push(task) {
		if (Array.isArray(task)) {
			task.forEach((item) => {
				this.push(item);
			});
		} else {
			this.queue.push(task);
			this.run();
		}
	}

	taskCallback({ data, task }) {
		this.activeTask--;
		this.onCompleteFn(task, data);
		this.run();
	}

	run() {
		if (this.queue.length === 0) {
			if (this.activeTask === 0) {
				this.drainCb();
			}
			return;
		}

		if (this.activeTask >= this.maxTask) {
			return;
		}

		const currentTask = this.queue.shift();
		this.activeTask++;

		this.processorFn(currentTask, (data) => this.taskCallback({ data, task: currentTask }));
	}

	drain(cb) {
		this.drainCb = cb;
		return;
	}
}

const processorFn = (task, callback) => {
	setTimeout(() => {
		console.log('Processing task ' + task.name);
		callback(`${task.name} data is computed`);
	}, 100);
};

const onCompleteFn = (task, data) => {
	console.log('Task has completed processing: ', task.name, data, Date.now());
};

// Create the queue
const myQueue = new TaskQueue(processorFn, onCompleteFn, 4);

// add some items to the queue
myQueue.push({ name: 'foo' });

// add some items to the queue (batch-wise)
myQueue.push([{ name: 'baz 1' }, { name: 'bay 2' }, { name: 'bax 3 ' }]);

setTimeout(() => {
	myQueue.push([{ name: 'x' }, { name: 'y' }, { name: 'z' }, { name: 'w' }]);
}, 500);

myQueue.drain(() => console.log('empty queue'));

/* Implement createDriver(name) driver methods: 
- takeRide(rideId, durationMs) -> Promise<string> - Logs: "[<t>ms] start:ride:<rideId>" then "[<t>ms] end:ride:<rideId>" - Resolves to "<rideId>" - drinkCoffee(durationMs) -> Promise<'coffee'> - Logs: "[<t>ms] start:coffee" then "[<t>ms] end:coffee" - Resolves to "coffee" 
- takeBreak(durationMs) -> Promise<'break'> - Queues a general break. - Logs: "[<t>ms] start:break" then "[<t>ms] end:break" - Resolves

driver can do only 1 task at any given point performance.now() can be used to fetch the current timestamp at any point timestamp logs need not to exactly match the logs below */

class CreateDriver {
	constructor(name) {
		this.name = name;
		this.tasks = [];
		this.queue = Promise.resolve();
	}

	_addTask(taskObj) {
		this.tasks.push(taskObj);
		this.queue = this.queue.then(async () => {
			if (!taskObj.cancelled) {
				const start = performance.now();
				console.log(`[${start.toFixed(2)}ms] start:${taskObj.type}:${taskObj.id || ''}`.trim());
				await new Promise((r) => setTimeout(r, taskObj.durationMs));
				const end = performance.now();
				console.log(`[${end.toFixed(2)}ms] end:${taskObj.type}:${taskObj.id || ''}`.trim());
				return taskObj.resolve(taskObj.id || taskObj.type);
			}
		});
		return taskObj.promise;
	}

	takeRide(rideId, durationMs) {
		let resolve;
		const promise = new Promise((r) => (resolve = r));
		return this._addTask({ type: 'ride', id: rideId, durationMs, cancelled: false, resolve, promise });
	}

	drinkCoffee(durationMs) {
		let resolve;
		const promise = new Promise((r) => (resolve = r));
		return this._addTask({ type: 'coffee', durationMs, cancelled: false, resolve, promise });
	}

	takeBreak(durationMs) {
		let resolve;
		const promise = new Promise((r) => (resolve = r));
		return this._addTask({ type: 'break', durationMs, cancelled: false, resolve, promise });
	}

	cancelRide(rideId) {
		// find first pending ride with matching id
		const task = this.tasks.find((t) => t.type === 'ride' && t.id === rideId && !t.cancelled);
		if (task) {
			task.cancelled = true;
			task.resolve(`ride:${rideId} cancelled`);
		}
	}
}

// Example usage
const driver = new CreateDriver('Alice');

driver.takeRide('A', 60); // [0.00ms] start:ride:A ... [60.00ms] end:ride:A
driver.drinkCoffee(30); // [60.00ms] start:coffee ... [90.00ms] end:coffee
driver.takeRide('B', 20); // [90.00ms] start:ride:B ... [110.00ms] end:ride:B
driver.takeBreak(10); // [110.00ms] start:break ... [120.00ms] end:break
driver.takeRide('C', 15); // [120.00ms] start:ride:C ... [135.00ms] end:ride:C
driver.drinkCoffee(5); // [135.00ms] start:coffee ... [140.00ms] end:coffee

setTimeout(() => {
	driver.cancelRide('B'); // cancels ride B before it starts
}, 50);

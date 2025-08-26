class UberDriver {
	constructor() {
		this.queue = [];
		console.log('Hello uber driver is online');

		// Ensures tasks start after constructor
		setTimeout(() => {
			this.run();
		}, 0);
	}

	async run() {
		for (let task of this.queue) {
			await task();
		}
	}

	pick(user) {
		this.queue.push(async () => {
			console.log(`User ${user} is picked`);
		});
		return this;
	}

	drop(user) {
		this.queue.push(async () => {
			console.log(`Drop ${user}`);
		});
		return this;
	}

	drive(time) {
		this.queue.push(async () => {
			console.log('Driver is driving');
			await new Promise((resolve) => setTimeout(resolve, time * 1000));
		});
		return this;
	}

	rest(time) {
		this.queue.push(async () => {
			console.log('Driver is in offline mode');
			await new Promise((resolve) => setTimeout(resolve, time * 1000));
		});
		return this;
	}

	coffeeBreak(time) {
		// Always executes first
		this.queue.unshift(async () => {
			console.log('User is on coffee break');
			await new Promise((resolve) => setTimeout(resolve, time * 1000));
		});
		return this;
	}
}

// Example Run
new UberDriver()
	.pick('TestUser')
	.pick('Rahul')
	.coffeeBreak(3) // always executes first
	.drive(2)
	.drop('Rahul')
	.drive(4)
	.drop('TestUser')
	.rest(10);

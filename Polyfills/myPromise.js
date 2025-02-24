class MyPromise {
	constructor(executor) {
		this.state = 'pending'; // "fulfilled" | "rejected"
		this.value = undefined;
		this.handlers = []; // Stores .then() callbacks

		const resolve = (value) => {
			if (this.state !== 'pending') return;
			this.state = 'fulfilled';
			this.value = value;
			this.handlers.forEach((handler) => handler(value));
		};

		const reject = (reason) => {
			if (this.state !== 'pending') return;
			this.state = 'rejected';
			this.value = reason;
			this.handlers.forEach((handler) => handler(reason));
		};

		this.cancelled = false;

		this.cancel = () => {
			this.cancelled = true;
			this.state = 'cancelled';
			this.handlers = [];
		};

		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	then(onFulfilled) {
		return new MyPromise((resolve, reject) => {
			const handler = (value) => {
				if (this.cancelled) return;
				try {
					resolve(onFulfilled(value));
				} catch (err) {
					reject(err);
				}
			};

			if (this.state === 'fulfilled') {
				handler(this.value);
			} else {
				this.handlers.push(handler);
			}
		});
	}

	catch(onRejected) {
		return new MyPromise((resolve, reject) => {
			this.catchHandler = (reason) => {
				if (this.cancelled) return;
				try {
					resolve(onRejected(reason));
				} catch (err) {
					reject(err);
				}
			};

			if (this.state === 'rejected') {
				this.catchHandler(this.value);
			}
		});
	}
}

const prom = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve('Done');
	}, 1000);
});

prom.then(function (data) {
	console.log('1' + data); // Prints "1 Done" after 1 sec
});

prom.then(function (data) {
	console.log('2' + data); // Prints "2 Done" after 1 sec
});

setTimeout(function () {
	prom.then(function (data) {
		console.log('3' + data); // Prints "3 Done" after 2 sec
	});
}, 2000);

const nwPromise = new MyPromise((resolve, reject) => {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', true);

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			resolve(xhr.responseText);
		}
	};

	xhr.send();

	nwPromise.cancel = () => {
		xhr.abort();
		reject('Request cancelled');
	};
});

nwPromise.then((data) => console.log('Response:', data)).catch((err) => console.error(err));

// Cancel the request before it completes
setTimeout(() => {
	nwPromise.cancel();
}, 500);

const promiseAllWithConcurrencyLimit = (functions, limit) => {
	let result = [];
	let currentIndex = 0;
	let activeCount = 0;

	return new Promise((resolve, reject) => {
		if (functions.length === 0) {
			resolve([]);
			return;
		}

		function runNext() {
			if (currentIndex >= functions.length && activeCount === 0) {
				resolve(result);
				return;
			}

			while (activeCount < limit && currentIndex < functions.length) {
				const index = currentIndex;
				currentIndex++;
				activeCount++;

				Promise.resolve(functions[index]())
					.then((res) => {
						result[index] = res;
						activeCount--;
						runNext();
					})
					.catch((err) => reject(err));
			}
		}

		runNext();
	});
};

// Example usage
const asyncFunc1 = () => new Promise((resolve) => setTimeout(() => resolve('Result 1'), 1000));
const asyncFunc2 = () => new Promise((resolve) => setTimeout(() => resolve('Result 2'), 500));
const asyncFunc3 = () => new Promise((resolve) => setTimeout(() => resolve('Result 3'), 2000));
const asyncFunc4 = () => new Promise((resolve) => setTimeout(() => resolve('Result 4'), 1500));

promiseAllWithConcurrencyLimit([asyncFunc1, asyncFunc2, asyncFunc3, asyncFunc4], 2)
	.then((results) => {
		console.log('Results:', results);
	})
	.catch((error) => {
		console.error('Error:', error);
	});

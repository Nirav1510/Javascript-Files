// implement a throttlePromises function

const throttlePromises = (funcs, max) => {
	return new Promise((resolve, reject) => {
		let index = 0;
		let active = 0;
		const results = new Array(funcs.length);
		let completed = 0;

		const ran = () => {
			if (completed === funcs.length) {
				resolve(results);
				return;
			}

			while (active < max && index < funcs.length) {
				const currentIndex = index;
				const fetchCall = funcs[index];
				index++;
				active++;

				fetchCall()
					.then((data) => {
						results[currentIndex] = data;
					})
					.catch(reject)
					.finally(() => {
						active--;
						completed++;
						ran();
					});
			}
		};

		ran();
	});
};

const mockFetcher = (time, flag, id) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (flag) {
				resolve(`resolved ${id}`);
			} else {
				reject(`rejected ${id}`);
			}
		}, time);
	});
};

const tasks = [
	() => mockFetcher(2000, true, 1),
	() => mockFetcher(1000, true, 2),
	() => mockFetcher(1500, true, 3),
	() => mockFetcher(500, true, 4),
	() => mockFetcher(2500, true, 5),
];

throttlePromises(tasks, 2)
	.then((res) => console.log('Final Result:', res))
	.catch((err) => console.error('Error:', err));

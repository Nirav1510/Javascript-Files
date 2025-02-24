const onlyTwice = (fn) => {
	let isOdd = true;
	let first = null;
	let second = null;

	return function (...args) {
		if (isOdd) {
			if (!first) {
				first = fn(...args);
			}

			isOdd = false;
			return first;
		} else {
			if (!second) {
				second = fn(...args);
			}

			isOdd = true;
			return second;
		}
	};
};

const add = (a, b) => a + b;
const addOnce = onlyTwice(add);

console.log(addOnce(1, 2)); // 3
console.log(addOnce(2, 3)); // 5
console.log(addOnce(3, 4)); // 3
console.log(addOnce(4, 5)); // 5

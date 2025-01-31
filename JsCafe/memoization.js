const memoize = (fn) => {
	const cache = new Map();

	return function (...args) {
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			console.log('from cache', key);
			return cache.get(key);
		} else {
			console.log('from function', key);
			const result = fn.apply(this, args);
			cache.set(key, result);
			return result;
		}
	};
};

const add = (a, b, c) => a + b + c;
const memoizedAdd = memoize(add);
// console.log(memoizedAdd(1, 2, 3));

// in recursion

const factorial = memoize((n) => {
	if (n === 0 || n === 1) return 1;
	return n * factorial(n - 1);
});

console.log(factorial(5));
console.log(factorial(6));

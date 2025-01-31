// Que. Implement a memoize function

function memoize(fn) {
	let cache = new Map();
	return function () {
		const key = JSON.stringify(arguments);
		if (cache.has(key)) {
			return cache.get(key);
		}
		const result = fn.apply(this, arguments);
		cache.set(key, result);
		return result;
	};
}

function memoizeNew(fn, context) {
	const cache = {};

	return function (...args) {
		const key = JSON.stringify(args);
		if (cache.hasOwnProperty(key)) {
			return cache[key];
		}
		const result = fn.call(context || this, args);
		cache[key] = result;
		return result;
	};
}

const demoFunc = (x, y) => {
	for (let i = 0; i < 100000; i++) {}
	console.log(x * y);
	return x * y;
};

const memoizedFunc = memoize(demoFunc);
const nonMemoized = demoFunc(1012, 2084324239);

console.time('first');
memoizedFunc(1012, 2084324239);
console.timeEnd('first');

console.time('second');
memoizedFunc(1012, 2084324239);
console.timeEnd('second');

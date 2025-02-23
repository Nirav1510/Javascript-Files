const safeStringify = (value) => {
	const seen = new WeakSet();

	return JSON.stringify(value, (key, val) => {
		if (typeof val === 'object' && val !== null) {
			if (seen.has(val)) {
				return '[Circular]';
			}
			seen.add(val);
		}
		return val;
	});
};

const customMemoize = (fn) => {
	const cache = new Map();

	function memoized(...args) {
		const key = safeStringify(args);
		if (cache.has(key)) {
			return cache.get(key);
		}

		const result = fn(...args);
		cache.set(key, result);
		return result;
	}

	memoized.cache = cache;
	return memoized;
};

// Example usage
const complexFunction = (obj, b) => obj.a + b;

const memoizedFunction = customMemoize(complexFunction);

const obj = { a: 10 };
console.log(memoizedFunction(obj, 5)); // Outputs: 15
console.log(memoizedFunction(obj, 5)); // Uses cache: Outputs: 15

// Test circular reference
const circularObj = {};
circularObj.self = circularObj;

console.log(memoizedFunction(circularObj, 5)); // Handles circular reference
console.log(memoizedFunction(circularObj, 5)); // Uses cache: Outputs the same result

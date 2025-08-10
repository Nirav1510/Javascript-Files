const stableStringify = (value, seen = new WeakSet()) => {
	if (value && typeof value === 'object') {
		if (seen.has(value)) {
			return '"[Circular]"'; // Prevents infinite recursion
		}
		seen.add(value);

		if (Array.isArray(value)) {
			return '[' + value.map((v) => stableStringify(v, seen)).join(',') + ']';
		} else {
			return (
				'{' +
				Object.keys(value)
					.sort()
					.map((key) => JSON.stringify(key) + ':' + stableStringify(value[key], seen))
					.join(',') +
				'}'
			);
		}
	}
	return JSON.stringify(value);
};

const memoizeWithCircularReference = (fn) => {
	const cache = new Map();

	return function (...args) {
		const key = stableStringify(args);

		if (cache.has(key)) {
			return cache.get(key);
		}

		const result = fn.apply(this, args);
		cache.set(key, result);
		return result;
	};
};

// example usage
const complexFunction = (obj) => {
	return {
		original: obj,
		modified: { ...obj, timestamp: new Date().toISOString() },
	};
};

const memoizedFunction = memoize(complexFunction);
const circularObj = {};
circularObj.self = circularObj; // Create a circular reference

console.log(memoizedFunction(circularObj));
console.log(memoizedFunction({ key: 'value' })); // Should return a new object
console.log(memoizedFunction(circularObj)); // Should return the cached result

console.log(memoizedFunction({ key: 'value' })); // Should return the cached result
console.log(memoizedFunction({ key: 'value', anotherKey: 'anotherValue' })); // Should return a new object
console.log(memoizedFunction(circularObj));
// Should return the cached result
console.log(memoizedFunction({ key: 'value', anotherKey: 'anotherValue' })); // Should return the cached result
console.log(memoizedFunction(circularObj)); // Should return the cached result

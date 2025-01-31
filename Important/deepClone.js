// implement a deepClone function

const deepClone = (value, seen = new WeakMap()) => {
	if (typeof value !== 'object' || value === null) return value;

	if (seen.has(value)) return seen.get(value);

	let clonedValue;

	if (Array.isArray(value)) {
		clonedValue = [];
		seen.set(value, clonedValue);
		value.forEach((item, index) => {
			clonedValue[index] = deepClone(item, seen);
		});
	} else if (value instanceof Date) {
		clonedValue = new Date(value.getTime());
	} else if (value instanceof RegExp) {
		clonedValue = new RegExp(value);
	} else if (value instanceof Map) {
		clonedValue = new Map();
		seen.set(value, clonedValue);
		value.forEach((val, key) => {
			clonedValue.set(key, deepClone(val, seen));
		});
	} else if (value instanceof Set) {
		clonedValue = new Set();
		seen.set(value, clonedValue);
		value.forEach((val) => {
			clonedValue.add(deepClone(val, seen));
		});
	} else {
		clonedValue = Object.create(Object.getPrototypeOf(value));
		seen.set(value, clonedValue);
		Object.keys(value).forEach((key) => {
			clonedValue[key] = deepClone(value[key], seen);
		});
	}

	return clonedValue;
};

const obj = {
	num: 42,
	bool: true,
	str: 'hello',
	arr: [1, 2, { nested: 'data' }],
	date: new Date(),
	regExp: /test/g,
	map: new Map([['key', 'value']]),
	set: new Set([1, 2, 3]),
	circular: null,
};

obj.circular = obj; // Creating a circular reference

const clonedObj = deepClone(obj);

console.log(clonedObj);
console.log(clonedObj !== obj); // true
console.log(clonedObj.arr !== obj.arr); // true
console.log(clonedObj.date !== obj.date); // true
console.log(clonedObj.map !== obj.map); // true
console.log(clonedObj.set !== obj.set); // true
console.log(clonedObj.circular === clonedObj); // true (Circular reference preserved)

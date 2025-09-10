/**
 * Resolve value from object based on a string path
 * Path supports: dot notation, array indices, functions, promises
 */

const getValueFromPath = async (obj, path) => {
	const parts = path
		.replace(/\[(\d+)\]/g, '.$1') // convert [0] → .0
		.split('.'); // split by dot

	let current = obj;

	for (let part of parts) {
		if (current == null) return undefined;

		// Resolve promise
		if (current instanceof Promise) {
			current = await current;
		}

		// Call function if encountered
		if (typeof current === 'function') {
			current = await current();
		}

		// Move to next property
		current = current[part];
	}

	// Final resolution: handle promise/function at end
	if (current instanceof Promise) {
		current = await current;
	}
	if (typeof current === 'function') {
		current = await current();
	}

	return current;
};

const obj = {
	a: {
		b: async () => ({
			c: [
				{
					d: () => 'Hello World!',
				},
			],
		}),
		e: {
			f: () => 42,
			g: async () => 'Async String',
		},
	},
	h: [{ i: 100 }, { i: () => 200 }, { i: async () => 300 }],
	j: Promise.resolve({
		k: () => 'From Promise',
	}),
	l: () => Promise.resolve('Function returning Promise'),
	m: {
		n: {
			o: {
				p: 'deep',
			},
		},
	},
};

(async () => {
	console.log(await getValueFromPath(obj, 'a.b.c[0].d'));
	// "Hello World!"

	console.log(await getValueFromPath(obj, 'a.e.f'));
	// 42 (sync function)

	console.log(await getValueFromPath(obj, 'a.e.g'));
	// "Async String" (async function)

	console.log(await getValueFromPath(obj, 'h.0.i'));
	// 100 (plain object in array)

	console.log(await getValueFromPath(obj, 'h.1.i'));
	// 200 (function inside array)

	console.log(await getValueFromPath(obj, 'h.2.i'));
	// 300 (async function inside array)

	console.log(await getValueFromPath(obj, 'j.k'));
	// "From Promise" (promise resolves to object with function)

	console.log(await getValueFromPath(obj, 'l'));
	// "Function returning Promise"

	console.log(await getValueFromPath(obj, 'm.n.o.p'));
	// "deep" (plain nested)

	console.log(await getValueFromPath(obj, 'x.y.z'));
	// undefined (path does not exist)
})();

// new example usage
const newObj = {
	a: async () => ({
		b: {
			c: () => ({
				d: 123,
			}),
		},
	}),
	x: {
		y: () =>
			Promise.resolve({
				z: 'Middle Async Function',
			}),
	},
	m: Promise.resolve({
		n: {
			o: () => ({
				p: () => 'Deep function chain',
			}),
		},
	}),
	arr: async () => [
		() => 'Index 0 Function',
		Promise.resolve('Index 1 Promise'),
		async () => ({ deep: 'Index 2 Async Function' }),
	],
};

(async () => {
	console.log(await getValueFromPath(newObj, 'a.b.c.d'));
	// 123
	// Function appears in the middle (a -> promise, b -> object, c -> function returning object)

	console.log(await getValueFromPath(newObj, 'x.y.z'));
	// "Middle Async Function"
	// Function in the middle that returns a Promise resolving to object

	console.log(await getValueFromPath(newObj, 'm.n.o.p'));
	// "Deep function chain"
	// Promise at start, function inside, another function deeper

	console.log(await getValueFromPath(newObj, 'arr.0'));
	// "Index 0 Function"
	// Array element is a function

	console.log(await getValueFromPath(newObj, 'arr.1'));
	// "Index 1 Promise"
	// Array element is a Promise

	console.log(await getValueFromPath(newObj, 'arr.2.deep'));
	// "Index 2 Async Function"
	// Array element is an async function returning an object
})();

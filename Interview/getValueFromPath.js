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

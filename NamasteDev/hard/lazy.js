function lazy(fnMap) {
	const queue = [];

	const handler = {
		get(target, prop) {
			if (prop === 'execute') {
				return () => {
					const results = queue.map(({ cb, args }) => cb(...args));
					queue.length = 0; // clear queue after execution
					return results;
				};
			}
			if (prop in fnMap) {
				return (...args) => {
					queue.push({ cb: fnMap[prop], args });
					return proxy;
				};
			}
			// Explicit error for unknown function names
			throw new Error(`Function ${prop} not found`);
		},
	};

	const proxy = new Proxy({}, handler);
	return proxy;
}

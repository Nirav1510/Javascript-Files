const throttle = (func, delay) => {
	let lastCallTime = 0;
	let lastResult;
	let timeoutId = null;

	return function (...args) {
		const now = Date.now();
		const remaining = delay - (now - lastCallTime);

		if (remaining <= 0) {
			// Enough time passed — run immediately
			lastCallTime = now;
			lastResult = func.apply(this, args);
			return lastResult;
		}

		if (!timeoutId) {
			// Schedule trailing call
			timeoutId = setTimeout(() => {
				lastCallTime = Date.now();
				lastResult = func.apply(this, args);
				timeoutId = null;
			}, remaining);
		}

		return lastResult;
	};
};

// Example usage
const log = (message) => {
	console.log(`${new Date().toISOString()}: ${message}`);
};
const throttledLog = throttle(log, 2000);

setInterval(() => {
	throttledLog('This message is throttled');
}, 500);

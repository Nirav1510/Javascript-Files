function mySetInterval(callback, delay, ...args) {
	let timerId = null;
	let isCleared = false;

	function repeat() {
		if (isCleared) return;
		callback(...args);
		timerId = setTimeout(repeat, delay);
	}

	timerId = setTimeout(repeat, delay);

	// Return a function to clear it
	return {
		clear: () => {
			isCleared = true;
			clearTimeout(timerId);
		},
	};
}

function once(func, context) {
	let ran;

	return function (...args) {
		if (func) {
			ran = func.apply(context || this, args);
			func = null;
		}
		return ran;
	};
}

const onceNew = (func) => {
	let result;
	let hasRun = false;

	return function (...args) {
		if (!hasRun) {
			result = func.apply(this, args);
			hasRun = true;
		}
		return result;
	};
};

const greet = onceNew((x, y) => console.log('hello!', x, y));

greet(1, 2);
greet();
greet();

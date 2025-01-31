// Implement a Pipeline & Compose Function

const pipeline =
	(...funcs) =>
	(input) =>
		funcs.reduce((acc, fn) => fn(acc), input);

const compose = (...funcs) => {
	funcs.reverse();
	return (input) => funcs.reduce((acc, fn) => fn(acc), input);
};

const add5 = (x) => x + 5;
const double = (x) => x * 2;
const square = (x) => x * x;

const processNumber = pipeline(add5, double, square); // left-to-right
const composeNumber = compose(add5, double, square); // right-to-left

console.log('pipe', processNumber(3)); // ((3 + 5) * 2)² = 256
console.log('compose', composeNumber(3)); // (3² * 2) + 5 = 23

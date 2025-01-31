// https://leetcode.com/problems/function-composition

const compose = (functions) => {
	return functions.reduceRight(
		(acc, fn) => {
			return (x) => fn(acc(x));
		},
		(x) => x
	);
};

const composeRecursive = function (functions) {
	if (functions.length === 0) {
		return (x) => x;
	} else if (functions.length === 1) {
		return functions[0];
	} else {
		const [fn, ...rest] = functions;
		return (x) => fn(composeRecursive(rest)(x));
	}
};

const fn1 = (x) => x + 1;
const fn2 = (x) => x * 2;
const fn3 = (x) => x + '!';
const fn4 = (x) => x.toUpperCase();

console.log(compose([fn1, fn2, fn3, fn4])(0));

// Que. convert func(a,b,c) into func(a)(b)(c);

function curry(func) {
	return function curriedFunction(...args) {
		if (args.length >= func.length) {
			return func(...args);
		} else {
			return function (...next) {
				return curriedFunction(...args, ...next);
			};
		}
	};
}

const sum = (a, b, c, d, e) => a + b + c + d + e;
const totalSum = curry(sum);
const res = totalSum(1)(2)(3)(5)(9);
console.log(res, 'res');

// reusable function
function evaluate(operation) {
	return function (a) {
		return function (b) {
			switch (operation) {
				case 'add':
					return a + b;

				case 'subtract':
					return a - b;

				case 'multiply':
					return a * b;

				case 'divide':
					return a / b;

				default:
					return 'invalid operation';
			}
		};
	};
}

const addition = evaluate('add')(1)(2);
console.log(addition);

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

console.log(res, "res");

const curry = (fn) => {
  return function curriedFn(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...newArgs) {
        return curriedFn(...args, ...newArgs);
      };
    }
  };
};

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // Outputs: 6
console.log(curriedAdd(1, 2)(3)); // Outputs: 6
console.log(curriedAdd(1, 2, 3)); // Outputs: 6

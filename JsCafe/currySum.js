// Write a JavaScript function named curryAndSum that takes five arguments and returns the sum of these arguments.
// The function should allow passing arguments in any order or fashion.

function curryAndSum(...args) {
  if (args.length === 5) {
    return args.reduce((acc, curr) => acc + curr, 0);
  }

  return function (...newArgs) {
    return curryAndSum(...args, ...newArgs);
  };
}

console.log(curryAndSum(1, 2, 3, 4, 5));
// console.log(curryAndSum(1, 2, 3, 4)(5));
console.log(curryAndSum(1)(2)(3)(4)(5));
console.log(curryAndSum(1, 2, 3)(4, 5));
console.log(curryAndSum(1, 2)(3, 4, 5));
console.log(curryAndSum(1)(2, 3, 4, 5));

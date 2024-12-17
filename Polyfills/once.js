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

const greet = once((x, y) => console.log("hello!", x, y));

greet(1, 2);
greet();
greet();

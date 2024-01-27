function once(func, context) {
  let ran;

  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }
    return ran;
  };
}

const greet = once((x, y) => console.log("hello!", x, y));

greet(1, 2);
greet();
greet();

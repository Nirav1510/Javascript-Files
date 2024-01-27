// Que. Implement a memoize function

function memoize(fn) {
  let cache = new Map();
  return function () {
    const key = JSON.stringify(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, arguments);
    cache.set(key, result);
    return result;
  };
}

const demoFunc = (x, y) => {
  for (let i = 0; i < 100000; i++) {}
  return x * y;
};

const memoizedFunc = memoize(demoFunc);

console.time("first");
demoFunc(1012, 2089);
console.timeEnd("first");

console.time("second");
demoFunc(1012, 2089);
console.timeEnd("second");

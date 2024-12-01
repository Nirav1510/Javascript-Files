// https://bigfrontend.dev/problem/implement-general-memoization-function

function memo(func, resolver = (...args) => args.join("_")) {
  const cache = new Map();

  return function (...args) {
    const key = resolver(...args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const ans = func.apply(this, args);
    cache.set(key, ans);
    return ans;
  };
}

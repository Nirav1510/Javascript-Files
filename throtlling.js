const throttle = (fn, delay) => {
  let flag = true;
  return function (...args) {
    if (flag) {
      flag = false;
      fn.apply(this, args);
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
};

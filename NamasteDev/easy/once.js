const once = (fn) => {
  let hasRun = false;
  let result;

  return function (...args) {
    if (!hasRun) {
      result = fn.apply(this, args);
      hasRun = true;
    }
    return result;
  };
};

const dummyFunction = (x, y) => {
  console.log("This function can only run once.", x + y);
};
const onceDummyFunction = once(dummyFunction);

onceDummyFunction(3, 4); // This will log the message
onceDummyFunction(3, 4); // This will not log anything again

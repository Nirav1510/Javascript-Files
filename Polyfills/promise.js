// polyfill for promise

function myPromise(executor) {
  let onResolve,
    onReject,
    isFullFilled = false,
    isCalled = false,
    isRejected = false,
    value;

  function resolve(val) {
    isFullFilled = true;
    value = val;

    if (typeof onResolve === "function") {
      onResolve(val);
      isCalled = true;
    }
  }

  function reject(err) {
    isRejected = true;
    value = err;

    if (typeof onReject === "function") {
      isCalled = true;
      onReject(err);
    }
  }

  this.then = function (cb) {
    onResolve = cb;

    if (isFullFilled && !isCalled) {
      isCalled = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (cb) {
    onReject = cb;
    if (isFullFilled && !isCalled) {
      isCalled = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

const temp = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

temp
  .then((cb) => {
    console.log(cb);
  })
  .catch((err) => {
    console.error(err);
  });

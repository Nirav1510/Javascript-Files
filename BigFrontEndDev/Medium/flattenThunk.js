// https://bigfrontend.dev/problem/throttle-Promises

/**
 * @param {Thunk} thunk
 * @return {Thunk}
 */

function flattenThunk(thunk) {
  return function (callback) {
    const _callback = (error, data) => {
      if (error) {
        callback(error);
      } else if (typeof data == "function") {
        data(_callback);
      } else {
        callback(error, data);
      }
    };
    thunk(_callback);
  };
}

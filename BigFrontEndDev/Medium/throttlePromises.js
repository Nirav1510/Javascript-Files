// https://bigfrontend.dev/problem/throttle-Promises

/**
 * @param {() => Promise<any>} arr
 * @param {number} max
 * @return {Promise}
 */

const throttlePromises = (arr, max) => {
  let result = [];
  return new Promise((resolve, reject) => {
    let queue = [...arr];
    let count = 0;

    const ran = () => {
      while (queue.length > 0 && count < max) {
        const fetchCall = queue.shift();
        count++;

        fetchCall()
          .then((data) => {
            count--;
            result.push(data);
            ran();
          })
          .catch((e) => {
            reject(e);
          });
      }

      if (result.length === arr.length) {
        resolve(result);
      }
    };

    ran();
  });
};

const mockFetcher = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 1500);
  });

const mockFetcher2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("error");
    }, 3000);
  });

throttlePromises([mockFetcher, mockFetcher2, mockFetcher], 2)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));

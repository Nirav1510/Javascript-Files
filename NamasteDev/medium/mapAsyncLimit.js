const mapAsyncLimit = (arr, limit, asyncFn) => {
  let result = [];
  let nextIndex = 0;
  let activeCount = 0;

  return new Promise((resolve, reject) => {
    if (arr.length === 0) {
      resolve([]);
      return;
    }
    function run() {
      if (nextIndex >= arr.length) {
        if (activeCount === 0) resolve(result);
        return;
      }

      const currentIndex = nextIndex++;
      activeCount++;

      asyncFn(arr[currentIndex])
        .then((res) => {
          result[currentIndex] = res;
          activeCount--;
          run();
          if (nextIndex >= arr.length && activeCount === 0) {
            resolve(result);
          }
        })
        .catch(reject);
    }

    for (let i = 0; i < Math.min(limit, arr.length); i++) {
      run();
    }
  });
};

const dummyArr = [1, 2, 3, 4, 5];
const limit = 2;

const dummyAsyncFn = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, Math.random() * 500);
  });
};

mapAsyncLimit(dummyArr, limit, dummyAsyncFn)
  .then((result) => {
    console.log("Mapped Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

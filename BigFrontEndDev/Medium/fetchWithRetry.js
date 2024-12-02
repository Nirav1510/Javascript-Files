// https://bigfrontend.dev/problem/retry-promise-on-rejection

const fetchWithAutoRetry = (fetcher, maximumRetryCount) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    const callApi = () => {
      fetcher()
        .then((res) => resolve(res))
        .catch((e) => {
          if (count < maximumRetryCount) {
            count++;
            callApi();
          } else {
            reject(e);
          }
          console.log("reject", count);
        });
    };

    callApi();
  });
};

const mockFetcher = () => {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    if (random > 0.7) {
      resolve("Success");
    } else {
      reject("Error");
    }
  });
};

fetchWithAutoRetry(mockFetcher, 3)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

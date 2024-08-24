// polyfill of Promise.all()

function myPromiseAll(taskList) {
  const results = [];
  let promisesCompleted = 0;

  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      if (taskList?.length === 0) resolve([]);
      promise
        .then((val) => {
          results[index] = val;
          promisesCompleted += 1;

          if (promisesCompleted === taskList.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          console.log("err", error.message);
          reject(error);
        });
    });
  });
}

const resolvedApis = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
};

const rejectedApis = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(time);
    }, time);
  });
};

let taskList = [resolvedApis(500), resolvedApis(2000), resolvedApis(1000)];

myPromiseAll(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch((e) => console.error("error", e));

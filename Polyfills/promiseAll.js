// polyfill of Promise.all()

function myPromiseAll(taskList) {
  const results = [];
  let promisesCompleted = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < taskList.length; i++) {
      taskList[i]
        .then((res) => {
          results[i] = res;
          promisesCompleted += 1;
          if (promisesCompleted === taskList.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    }

    // taskList.forEach((promise, index) => {
    //   promise
    //     .then((val) => {
    //       results[index] = val;
    //       promisesCompleted += 1;

    //       if (promisesCompleted === taskList.length) {
    //         resolve(results);
    //       }
    //     })

    //     .catch((error) => {
    //       console.log("err", error.message);
    //       reject(error);
    //     });
    // });
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

let taskList = [resolvedApis(500), resolvedApis(2000), rejectedApis(1000)];

myPromiseAll(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch((e) => console.error("error", e));

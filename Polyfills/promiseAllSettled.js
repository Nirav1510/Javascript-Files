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

let taskList = [resolvedApis(500), rejectedApis(2000), resolvedApis(1000)];

function myPromiseAllSettled(taskList) {
  const results = [];
  let promisesCompleted = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < taskList.length; i++) {
      taskList[i]
        .then((res) => {
          results[i] = { status: "fulfilled", value: res };
          promisesCompleted += 1;
          if (promisesCompleted === taskList.length) {
            resolve(results);
          }
        })
        .catch((e) => {
          results[i] = { status: "rejected", reason: e };
          promisesCompleted += 1;
          if (promisesCompleted === taskList.length) {
            reject(results);
          }
        });
    }
  });
}

myPromiseAllSettled(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch((e) => console.error("error", e));

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

function myPromiseRace(taskList) {
  let result = "";
  return new Promise((resolve, reject) => {
    for (let i = 0; i < taskList.length; i++) {
      taskList[i]
        .then((res) => {
          result = res;
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

myPromiseRace(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch((e) => console.error("error", e));

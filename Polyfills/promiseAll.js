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
function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (time < 3000) {
        reject("Rejected");
      } else {
        resolve(time);
      }
    }, time);
  });
}

const taskList = [task(7000), task(5000), task(4000)];

myPromiseAll(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch(console.error);

const createSetTimeOut = () => {
  let timerId = 0;
  let timerMap = {};

  function mySetTimeoutPoly(cb, delay) {
    let id = timerId++;
    timerMap[id] = { cb, delay, startTime: Date.now() };

    checkTimer(id);

    return id;
  }

  function checkTimer(id) {
    if (!timerMap[id]) return;

    const now = Date.now();
    const elapsed = now - timerMap[id].startTime;

    if (elapsed >= timerMap[id].delay) {
      timerMap[id].cb();
      delete timerMap[id];
    } else {
      requestIdleCallback(() => checkTimer(id));
    }
  }

  function clearTimerPoly(id) {
    delete timerMap[id];
  }

  return { mySetTimeoutPoly, clearTimerPoly };
};

const { mySetTimeoutPoly, clearTimerPoly } = createSetTimeOut();

console.log("start");

mySetTimeoutPoly(() => {
  console.log("1");
}, 1000);

mySetTimeoutPoly(() => {
  console.log("2");
}, 2000);

console.log("end");

/*
Design a TaskRunner constructor function that creates an instance capable of managing and executing asynchronous tasks. 

The instance should allow tasks to be continuously added through its push method.
However, the number of tasks running concurrently should never exceed the specified concurrency limit.
*/

function TaskRunner(concurrency) {
  this.concurrency = concurrency;
  this.tasks = [];
  this.running = 0;
}

TaskRunner.prototype.push = function push(task) {
  this.tasks.push(task);
  this.runNext();
};

TaskRunner.prototype.runNext = function runNext() {
  if (this.running >= this.concurrency || this.tasks.length === 0) {
    // If concurrency limit is reached or no tasks in the queue, do nothing
    return;
  }

  const nextTask = this.tasks.shift(); // Dequeue the next task
  this.running++; // Increment the number of running tasks

  nextTask()
    .then(() => {
      this.running--; // Decrement running count when task completes
      this.runNext(); // Start the next task if available
    })
    .catch((err) => {
      console.error("Task failed :", err);
      this.running--; // Decrement running count on failure
      this.runNext(); // Start the next task if available
    });
};

// Mock Task Functions
function exampleSimpleTask1() {
  console.log("executed 1");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Resolved 1");
      resolve();
    }, 1000);
  });
}

function exampleSimpleTask2() {
  console.log("executed 2");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Resolved 2");
      resolve();
    }, 2000);
  });
}

function exampleSimpleTask3() {
  console.log("executed 3");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Resolved 3");
      resolve();
    }, 3000);
  });
}

function exampleSimpleTask4() {
  console.log("executed 4");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Resolved 4");
      resolve();
    }, 3000);
  });
}

function exampleSimpleTask5() {
  console.log("executed 5");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Resolved 5");
      resolve();
    }, 2000);
  });
}

function exampleSimpleTask6() {
  console.log("executed 6");

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Resolved 6");
      resolve();
    }, 4000);
  });
}
// Mock Task Functions

var r = new TaskRunner(3);
r.push(exampleSimpleTask1); // executes immediately
r.push(exampleSimpleTask2); // executes immediately
r.push(exampleSimpleTask3); // executes immediately
r.push(exampleSimpleTask4); // should wait until one of the running tasks completes
r.push(exampleSimpleTask5); // should wait until one of the running tasks completes
r.push(exampleSimpleTask6); // should wait until one of the running tasks completes

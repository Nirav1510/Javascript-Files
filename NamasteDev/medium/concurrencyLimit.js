async function scheduleTasks(tasks, maxConcurrent) {
  if (tasks.length === 0) return Promise.resolve([]);

  const result = new Array(tasks.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < tasks.length) {
      const idx = currentIndex;
      currentIndex++;
      result[idx] = await tasks[idx]();
    }
  }

  const workers = Array.from(
    { length: Math.min(maxConcurrent, tasks.length) },
    worker
  );
  await Promise.all(workers);
  return result;
}

const tasks = [
  () => new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  () => new Promise((resolve) => setTimeout(() => resolve(2), 500)),
  () => new Promise((resolve) => setTimeout(() => resolve(3), 2000)),
  () => new Promise((resolve) => setTimeout(() => resolve(4), 1500)),
];
const maxConcurrent = 2;

scheduleTasks(tasks, maxConcurrent)
  .then((results) => {
    console.log("Results:", results);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

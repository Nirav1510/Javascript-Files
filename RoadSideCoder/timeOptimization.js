function find() {
  let arr = [];
  for (let i = 0; i < 10000000; i++) {
    arr[i] = i * i;
  }

  return function (idx) {
    console.log(arr[idx]);
  };
}

const closure = find();

console.time("6");
closure(6);
console.timeEnd("6");

console.time("12");
closure(12);
console.timeEnd("12");

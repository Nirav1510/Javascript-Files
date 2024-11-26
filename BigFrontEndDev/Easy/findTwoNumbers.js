// https://bigfrontend.dev/problem/Find-two-numbers-that-sum-up-to-0

const findTwoNumbers = (arr) => {
  let map = new Map();

  for (let i = 0; i < arr.length; i++) {
    const target = 0 - arr[i];

    if (map.has(target)) {
      return [map.get(target), i];
    }

    map.set(arr[i], i);
  }

  return null;
};

console.log(findTwoNumbers([-3, -2, -1, 0, 1, 2, 3]));

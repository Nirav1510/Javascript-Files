// https://leetcode.com/problems/missing-number

var missingNumber = function (arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  let rangeSum = 0;

  for (let i = 0; i <= arr.length; i++) {
    rangeSum += i;
  }

  return rangeSum - sum;
};

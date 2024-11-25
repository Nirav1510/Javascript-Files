// https://leetcode.com/problems/missing-number

var missingNumber = function (nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  let rangeSum = 0;

  for (let i = 0; i <= nums.length; i++) {
    rangeSum += i;
  }

  return rangeSum - sum;
};

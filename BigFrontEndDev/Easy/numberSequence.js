// https://bigfrontend.dev/problem/A-number-sequence

const transform = (num) => {
  let currentDigit = "";
  let result = "";
  let currentCount = 0;

  for (let i = 0; i <= num.length; i++) {
    if (num[i] === currentDigit) {
      currentCount += 1;
    } else {
      if (currentCount) {
        result += currentCount + currentDigit;
      }
      currentDigit = num[i];
      currentCount = 1;
    }
  }
  return result;
};

const getNthNum = (n) => {
  let num = "1";

  while (n > 1) {
    num = transform(num);
    n--;
  }

  return num;
};

console.log(getNthNum(5)); // 111221
console.log(getNthNum(6)); // 312211
console.log(getNthNum(7));

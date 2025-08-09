const chunkArray = (arr, n) => {
  let result = [];

  for (let i = 0; i < arr.length; i += n) {
    const subArr = [];
    for (let j = i; j < i + n && j < arr.length; j++) {
      subArr.push(arr[j]);
    }
    result.push(subArr);
  }
  return result;
};

const result = chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
console.log(result);

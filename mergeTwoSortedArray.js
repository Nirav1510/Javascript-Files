const mergeSortedArrays = (arr1, arr2) => {
  const mergedArray = [];
  let i = 0;
  let j = 0;

  // Traverse both arrays and insert smaller of both elements in mergedArray
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      mergedArray.push(arr1[i]);
      i++;
    } else {
      mergedArray.push(arr2[j]);
      j++;
    }
  }

  // Store remaining elements of arr1
  while (i < arr1.length) {
    mergedArray.push(arr1[i]);
    i++;
  }

  // Store remaining elements of arr2
  while (j < arr2.length) {
    mergedArray.push(arr2[j]);
    j++;
  }

  return mergedArray;
};

const arr1 = [1, 3, 5, 7];
const arr2 = [2, 4, 6, 8];
const result = mergeSortedArrays(arr1, arr2);
console.log(result);

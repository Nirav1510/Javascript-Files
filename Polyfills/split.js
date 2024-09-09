// polyfill for split

const startSplit = (str, idx, delimiter, result, length) => {
  if (idx >= length) return;

  const index = str.indexOf(delimiter);

  if (index >= 0) {
    result.push(str.substring(0, index));
    startSplit(
      str.substring(index + delimiter.length),
      index + delimiter.length,
      delimiter,
      result,
      length
    );
  } else {
    result.push(str);
  }
};

const mySplit = function (string, delimiter) {
  const result = [];

  if (delimiter === "") return Array.from(string);
  startSplit(string, 0, delimiter, result, string.length);
  return result;
};

console.log(mySplit("The quick the fox jumps the lazy dog.", "the"));

console.log(mySplit("The quick the fox jumps the lazy dog.", ""));

console.log(mySplit("The quick the fox jumps the lazy dog.", " "));

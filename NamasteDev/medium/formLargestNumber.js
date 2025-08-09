function formLargestNumber(arr) {
  if (arr.length === 0) return "";

  const strArr = arr.map(String);

  strArr.sort((a, b) => (b + a).localeCompare(a + b)); // Sort in descending order based on concatenated values

  const result = strArr.join("");

  return result[0] === "0" ? "0" : result;
}

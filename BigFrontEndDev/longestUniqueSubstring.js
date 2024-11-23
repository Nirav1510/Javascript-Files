// https://bigfrontend.dev/problem/longest-substring-with-unique-characters

function longestUniqueSubstr(str) {
  let start = 0;
  let ans = "";
  let ansLength = 0;
  let charIndexMap = {};

  for (let end = 0; end < str.length; end++) {
    const char = str[end];

    if (charIndexMap.hasOwnProperty(char) && charIndexMap[char] >= start) {
      start = charIndexMap[char] + 1;
    }

    charIndexMap[char] = end;

    const length = end - start + 1;

    if (length > ansLength) {
      ansLength = length;
      ans = str.substring(start, end + 1);
    }
  }
  return ans;
}

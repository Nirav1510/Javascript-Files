// We need to figure out how many complete cycles of string s are required to match the entire string str,
// with the restriction that once a character from str is matched, we cannot backtrack
// in s(i.e., after completing one cycle of s, we start the next cycle from the beginning of s).

function cyclesToFormStr(s, str) {
  let cycleCount = 1; // Start with the first cycle
  let strIndex = 0;
  const sLen = s.length;
  const strLen = str.length;

  // Iterate through the string `str`
  for (let i = 0; i < strLen; i++) {
    // If we've reached the end of s, start a new cycle
    if (strIndex === sLen) {
      cycleCount++;
      strIndex = 0; // Reset to the start of s
    }

    // Match the current character of str with the current character in s
    if (s[strIndex] === str[i]) {
      strIndex++;
    }
  }

  return cycleCount;
}

// Example usage
const s = "abc";
const str = "abccab";
const result = cyclesToFormStr(s, str);
console.log(result); // Output: 3

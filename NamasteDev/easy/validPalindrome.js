const isAlphaNumeric = (char) => {
  return /^[a-z0-9]+$/i.test(char);
};

const validPalindrome = (s) => {
  if (!s) return true;

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (!isAlphaNumeric(s[left]) && left < right) left++;
    while (!isAlphaNumeric(s[right]) && left < right) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;

    left++;
    right--;
  }

  return true;
};

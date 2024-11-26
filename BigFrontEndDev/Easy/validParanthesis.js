// https://bigfrontend.dev/problem/validate-parenthesis

function validate(str) {
  const stack = [];
  const bracketMap = {
    "}": "{",
    ")": "(",
    "]": "[",
  };

  for (let i = 0; i < str.length; i++) {
    if (["(", "[", "{"].includes(str[i])) {
      stack.push(str[i]);
    } else if (stack.pop() !== bracketMap[str[i]]) {
      return false;
    }
  }

  return stack.length === 0;
}

function generateFibonacci(n) {
  if (typeof n !== "number" || n <= 0) return [];
  if (n === 1) return [0];

  let ans = [0, 1];

  for (let i = 2; i < n; i++) {
    ans.push(ans[i - 1] + ans[i - 2]);
  }

  return ans;
}

module.exports = { generateFibonacci };

// que. Create a JavaScript function that returns the Fibonacci sequence up to a given number, utilizing memoization for optimized performance.

function fibonacci(n, memo = []) {
  // Base cases
  if (n === 0) return 0;
  if (n === 1) return 1;

  // Check if result is already cached
  if (memo[n]) {
    return memo[n];
  }

  // Calculate and store the result in memo
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

function fibonacciSequence(limit) {
  const sequence = [];
  let i = 0;

  while (true) {
    const fib = fibonacci(i);
    if (fib > limit) break;
    sequence.push(fib);
    i++;
  }

  return sequence;
}

const fibonacciSequenceNew = (limit) => {
  const sequence = [0, 1];

  while (true) {
    const nextFib =
      sequence[sequence.length - 1] + sequence[sequence.length - 2];
    if (nextFib > limit) {
      break;
    }
    sequence.push(nextFib);
  }

  return sequence;
};

console.log(fibonacciSequence(100)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]

console.log(fibonacciSequenceNew(100)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]

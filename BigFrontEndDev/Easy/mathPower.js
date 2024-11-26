// https://bigfrontend.dev/problem/implement-Math-pow

function pow(base, power) {
  if (power == 0) return 1;
  if (power == 1) return base;
  if (power == -1) return 1 / base;

  if (power % 2 === 0) {
    let res = pow(base, power / 2);
    return res * res;
  } else {
    return base * pow(base, power - 1);
  }
}

console.log(pow(2, 3));
console.log(pow(2, -3));

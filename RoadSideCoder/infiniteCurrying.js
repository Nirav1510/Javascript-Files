// que. Infinite currying sum(1)(2)(3)....(n)

const sum = (a) => {
  return (b) => {
    if (b) {
      return sum(a + b);
    } else {
      return a;
    }
  };
};

const add = sum(1)(2)(3)(4)(5)(6)(7)(8)(9)(10);

console.log(add());

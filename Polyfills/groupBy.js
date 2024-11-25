const myGroupBy = (values, keySelector) => {
  const ans = {};

  values.forEach((value) => {
    const key =
      typeof keySelector === "function"
        ? keySelector(value)
        : value[keySelector];

    if (!ans[key]) {
      ans[key] = [value];
    } else {
      ans[key].push(value);
    }
  });

  return ans;
};

const a = myGroupBy([6.1, 4.2, 6.3], Math.floor);
console.log("a", a);
const b = myGroupBy(["one", "two", "three"], "length");
console.log("b", b);

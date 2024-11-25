const myGroupBy = (values, keySelector) => {
  return values.reduce((acc, value) => {
    const key =
      typeof keySelector === "function"
        ? keySelector(value)
        : value[keySelector];

    if (!acc[key]) {
      acc[key] = [value];
    } else {
      acc[key].push(value);
    }

    return acc;
  }, {});
};

const a = myGroupBy([6.1, 4.2, 6.3], Math.floor);
console.log("a", a);
const b = myGroupBy(["one", "two", "three"], "length");
console.log("b", b);

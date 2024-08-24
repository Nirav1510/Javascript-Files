function flattenObject(obj, parent = "") {
  let ans = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = parent + key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(ans, flattenObject(value, fullKey + "."));
    } else {
      ans[fullKey] = value;
    }
  }

  return ans;
}

const obj = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

const result = flattenObject(obj, "");
console.log(result);

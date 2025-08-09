const getResultByPath = (path, obj) => {
  const keys = path
    .replace(/\[(\w+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);
  let result = obj;

  for (const key of keys) {
    if (result === null) return null;
    if (result === undefined) return undefined;
    result = result[key];
  }

  return result;
};

// recursive
const getResultByPathRecursive = (path, obj) => {
  const keys = path
    .replace(/\[(\w+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  if (keys.length === 0) return obj;

  const [firstKey, ...restKeys] = keys;
  if (obj === null || obj === undefined) return obj;

  return getResultByPathRecursive(restKeys.join("."), obj[firstKey]);
};

const path = "data.results.status";
const obj = {
  data: {
    results: {
      status: "completed",
      error: "",
    },
  },
};

console.log(getResultByPath(path, obj)); // "completed"

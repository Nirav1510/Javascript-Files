const myGroupBy = (arr, key) => {
  const ans = {};

  arr.forEach((item) => {
    const groupKey = item[key];

    if (!ans[groupKey]) {
      ans[groupKey] = [item];
    } else {
      ans[groupKey].push(item);
    }
  });
  return ans;
};

// using reduce
const myGroupByReduce = (arr, key) => {
  return arr.reduce((acc, item) => {
    const groupKey = item[key];

    if (!acc[groupKey]) {
      acc[groupKey] = [item];
    } else {
      acc[groupKey].push(item);
    }

    return acc;
  }, {});
};

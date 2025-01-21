// Given a nested JavaScript object, the task is to flatten the object and pull out all the values to a infinite depth.

let object = {
  Company: "GeeksforGeeks",
  Address: "Noida",
  contact: +91 - 999999999,
  mentor: {
    HTML: "GFG",
    CSS: "GFG",
    JavaScript: "GFG",
    FrameWork: {
      Vue: "GFG",
      React: "GFG",
      Angular: "GFG",
      Node: ["express", 12, 0],
    },
  },
};

const flatObjectBasic = (obj) => {
  let ans = {};

  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    if (typeof obj[key] == "object" && obj[key] !== null) {
      const flatObj = flatObject(obj[key]);
      for (let i in flatObj) {
        if (!flatObj.hasOwnProperty(i)) continue;
        ans[key + "." + i] = flatObj[i];
      }
    } else {
      ans[key] = obj[key];
    }
  }
  return ans;
};

const flatObject = (obj, prefix = "") => {
  let ans = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix + key;
    if (typeof value === "object" && value !== null) {
      Object.assign(ans, flatObject(value, fullKey + "."));
    } else {
      ans[fullKey] = value;
    }
  }

  return ans;
};

const flatObjectReduce = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const fullKey = key;

    if (typeof value === "object" && value !== null) {
      Object.assign(acc, flatObject(value, fullKey + "."));
    } else {
      acc[fullKey] = value;
    }

    return acc;
  }, {});
};

const result = flatObject(object);
console.log(result);

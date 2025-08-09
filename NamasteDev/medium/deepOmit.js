const deepOmit = (obj, keysToOmit) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepOmit(item, keysToOmit));
  } else if (obj != null && typeof obj === "object") {
    const copyObj = {};

    Object.keys(obj).forEach((key) => {
      if (!keysToOmit.includes(key)) {
        copyObj[key] = deepOmit(obj[key], keysToOmit);
      }
    });
    return copyObj;
  }
  return obj;
};

// Example usage
const data = {
  id: 1,
  name: "John",
  details: {
    age: 30,
    address: {
      city: "New York",
      zip: "10001",
    },
  },
  tags: ["developer", "javascript"],
};

const keysToOmit = ["id", "zip"];
const result = deepOmit(data, keysToOmit);
console.log(result);

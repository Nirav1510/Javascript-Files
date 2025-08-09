const customAssign = (target, ...sources) => {
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const result = Object(target);

  sources.forEach((source) => {
    if (source != null) {
      Object.keys(source).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          result[key] = source[key];
        }
      });
    }
  });

  return result;
};

// Example usage
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const obj3 = { d: 5 };
const mergedObj = customAssign({}, obj1, obj2, obj3);
console.log(mergedObj); // Outputs: { a: 1, b: 3, c: 4, d: 5 }

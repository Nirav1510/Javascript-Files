const flattenArray = (arr) => {
	let result = [];

	arr.forEach((item) => {
		if (Array.isArray(item)) {
			result = [...result, ...flattenArray(item)];
		} else {
			result.push(item);
		}
	});

	return result;
};

// Example usage:
const nestedArray = [1, [2, [3, 4], 5], 6];
const flattenedArray = flattenArray(nestedArray);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]

const deepClone = (obj) => {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	if (Array.isArray(obj)) {
		const ans = [];
		for (let item of obj) {
			ans.push(deepClone(item));
		}
		return ans;
	}

	const ans = {};
	Object.keys(obj).forEach((key) => {
		if (obj.hasOwnProperty(key)) {
			ans[key] = deepClone(obj[key]);
		}
	});
	return ans;
};

// Example usage
const original = {
	a: 1,
	b: {
		c: 2,
		d: [3, 4, { e: 5 }],
	},
};
const cloned = deepClone(original);
cloned.b.d[2].e = 6; // Modify the cloned object
console.log(original); // Output: { a: 1, b: { c: 2, d: [ 3, 4, { e: 6 } ] } }
console.log(cloned); // Output: { a: 1, b: { c: 2, d: [ 3, 4, { e: 5 } ] } }

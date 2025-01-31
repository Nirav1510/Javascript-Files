// Implement a Flatten Function

const deepFlatArray = (arr) => {
	const result = [];

	arr.forEach((item) => {
		if (Array.isArray(item)) {
			result.push(...deepFlat(item));
		} else {
			result.push(item);
		}
	});

	return result;  
};

const deepFlatObject = (obj, prefix = '') => {
	const result = {};

	for (const [key, value] of Object.entries(obj)) {
		const fullKey = prefix + key;
		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			Object.assign(result, deepFlatObject(value, fullKey + '.'));
		} else {
			result[fullKey] = value;
		}
	}

	return result;
};

const obj = {
	A: '12',
	B: 23,
	C: {
		P: 23,
		O: {
			L: 56,
		},
		Q: [1, 2],
	},
};

const result = deepFlatObject(obj);
console.log(result);

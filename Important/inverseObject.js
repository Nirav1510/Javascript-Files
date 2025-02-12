const inverse = (obj) => {
	const arr = Object.entries(obj);

	const result = arr.reduce((acc, [key, val]) => {
		if (Array.isArray(val)) {
			for (let v of val) {
				if (!acc[v]) acc[v] = [];
				acc[v].push(key);
			}
		} else {
			if (!acc[val]) acc[val] = [];
			acc[val].push(key);
		}
		return acc;
	}, {});

	// Convert single-element arrays to single values
	for (let key in result) {
		if (result[key].length === 1) {
			result[key] = result[key][0];
		}
	}

	return result;
};

// Test case
const t1 = {
	1: 'a',
	2: 'b',
	3: ['c', 'd', 'e'],
	4: 'a',
};

console.log(inverse(t1));

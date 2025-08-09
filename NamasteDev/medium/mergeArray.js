const mergeData = (a = [], b = []) => {
	const m = a.length;
	const n = b.length;
	if (!m && !n) return [];
	if (!m) return b;
	if (!n) return a;

	const map = new Map();

	a.forEach((item) => {
		const { id, ...rest } = item;
		map.set(id, { id, ...rest });
	});

	b.forEach((item) => {
		const { id, ...rest } = item;
		if (map.has(id)) {
			map.set(id, { ...map.get(id), ...rest });
		} else {
			map.set(id, { id, ...rest });
		}
	});

	return Array.from(map.values());
};

// Example usage
const arr1 = [
	{ id: 1, name: 'Alice', age: 25 },
	{ id: 2, name: 'Bob', age: 30 },
	{ id: 3, name: 'Charlie', age: 35 },
];
const arr2 = [
	{ id: 1, title: 'Developer', salary: 50000 },
	{ id: 2, title: 'Designer', salary: 55000 },
	{ id: 4, title: 'Manager', salary: 60000 },
];

const merged = mergeData(arr1, arr2);
console.log(merged);

// Outputs:
// [
//   { id: 1, name: 'Alice', age: 25, title : 'Developer', salary: 50000 },
//   { id: 2, name: 'Bob', age: 30, title: 'Designer', salary: 55000 },
//   { id: 3, name: 'Charlie', age: 35 },
//   { id: 4, title: 'Manager', salary: 60000 }
// ]

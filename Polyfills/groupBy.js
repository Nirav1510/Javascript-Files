const myGroupBy = (values, keySelector) => {
	const ans = {};

	values.forEach((value) => {
		const key = typeof keySelector === 'function' ? keySelector(value) : value[keySelector];

		if (!ans[key]) {
			ans[key] = [value];
		} else {
			ans[key].push(value);
		}
	});

	return ans;
};

const a = myGroupBy([6.1, 4.2, 6.3], Math.floor);
console.log('a', a);
const b = myGroupBy(['one', 'two', 'three'], 'length');
console.log('b', b);
const c = myGroupBy(
	[
		{ user: 'barney', age: 36, active: true },
		{ user: 'fred', age: 40, active: false },
		{ user: 'pebbles', age: 1, active: true },
	],
	'active'
);
console.log('c', c);

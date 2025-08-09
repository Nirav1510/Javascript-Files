const formatList = (items) => {
	const n = items.length;
	if (n === 0) return '';
	if (n === 1) return items[0];

	let ans = '';
	items.forEach((item, idx) => {
		if (idx === n - 1) {
			ans += 'and ' + item;
		} else {
			ans += item + (idx === n - 2 ? ' ' : ', ');
		}
	});

	return ans;
};

// another way to do it
const formatListAlt = (items) => {
	if (items.length === 0) return '';
	if (items.length === 1) return items[0];

	return items.slice(0, items.length - 1).join(', ') + ' and ' + items[items.length - 1];
};

// Example usage
const items = ['apple', 'banana', 'cherry'];
console.log(formatList(items)); // Outputs: "apple, banana, and cherry"

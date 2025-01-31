// https://bigfrontend.dev/problem/most-frequently-occurring-character

const mostFrequentChar = (str) => {
	let ans = [];
	let map = new Map();

	for (const c of str) {
		map.set(c, (map.get(c) || 0) + 1);
	}

	const max = Math.max(...map.values());

	for (const [key, value] of map) {
		if (value === max) {
			ans.push(key);
		}
	}
	return ans.length === 1 ? ans[0] : ans;
};

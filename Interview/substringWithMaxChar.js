const subStringMaxChar = (str, k) => {
	const n = str.length;
	if (k > n) return '';

	let start = 0;
	let res = '';
	const map = {};

	for (let end = 0; end < n; end++) {
		// Add current char
		map[str[end]] = (map[str[end]] || 0) + 1;

		// When window reaches size k
		if (end - start + 1 === k) {
			// Find max char in this window
			let maxChar = '';
			let maxCount = 0;
			for (let char in map) {
				if (map[char] > maxCount) {
					maxCount = map[char];
					maxChar = char;
				}
			}
			res = maxChar;

			// Remove start char from window
			map[str[start]]--;
			if (map[str[start]] === 0) {
				delete map[str[start]];
			}
			start++;
		}
	}

	return res;
};

console.log(subStringMaxChar('abcc', 3)); // "c"

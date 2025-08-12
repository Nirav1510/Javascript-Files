// "444522999922233" -> "4351259432"

const compressString = (str) => {
	if (!str) return '';

	const map = {};
	let ans = '';

	str.split('').forEach((char) => {
		if (map[char]) {
			map[char] = map[char] + 1;
		} else {
			map[char] = 1;
		}
	});

	Object.entries(map).forEach(([key, val]) => {
		ans = ans + key + val;
	});

	return ans;
};

// space complexity: O(1)
const compressStringNew = (s) => {
	if (!s) return '';

	let ans = '';
	const n = s.length;

	for (let i = 0; i < n; i++) {
		let count = 0,
			currentChar = s[i];
		let checkIsPresent = false;

		for (let j = 0; j < i; j++) {
			if (currentChar === s[j]) {
				checkIsPresent = true;
				break;
			}
		}

		if (checkIsPresent) continue;

		for (let j = i + 1; j < n; j++) {
			if (s[j] === currentChar) {
				count++;
			}
		}
		ans += currentChar + count;
	}

	return ans;
};

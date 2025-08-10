const lengthOfLongestSubstring = (s) => {
	if (!s) return 0;

	let ans = 0;
	const map = new Map();
	let i = 0;
	let j = 0;
	let n = s.length;

	while (j < n) {
		if (map.has(s[j]) && map.get(s[j]) >= i) {
			i = map.get(s[j]) + 1;
		}

		map.set(s[j], j);

		ans = Math.max(ans, j - i + 1);
		j++;
	}

	return ans;
};

// Example usage
console.log(lengthOfLongestSubstring('abcabcbb')); // Outputs: 3 (substring "abc")
console.log(lengthOfLongestSubstring('bbbbb')); // Outputs: 1 (substring "b")
console.log(lengthOfLongestSubstring('pwwkew')); // Outputs: 3 (substring "wke")

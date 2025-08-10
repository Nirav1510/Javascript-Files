function compressString(str) {
	if (!str) return ''; // handle empty string early

	let currentCount = 0;
	let currentChar = '';
	let ans = '';

	const appendChunk = (char, count) => {
		while (count > 9) {
			ans += char + 9;
			count -= 9;
		}
		if (count > 1) {
			ans += char + count;
		} else if (count === 1 && ans.endsWith(char + 9)) {
			ans += char + 1;
		} else if (count === 1) {
			ans += char;
		}
	};

	for (let i = 0; i < str.length; i++) {
		if (currentChar === str[i]) {
			currentCount++;
		} else {
			if (currentCount > 0) {
				appendChunk(currentChar, currentCount);
			}
			currentChar = str[i];
			currentCount = 1;
		}
	}

	appendChunk(currentChar, currentCount);

	return ans;
}
// Example usage
console.log(compressString('aabcccccaaa')); // Outputs: a2bc5a3
console.log(compressString('aabbcc')); // Outputs: a2b2c2
console.log(compressString('aaabba')); // Outputs: a3b2a
console.log(compressString('')); // Outputs: ''
console.log(compressString('aa')); // Outputs: a2

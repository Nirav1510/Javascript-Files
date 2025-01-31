// https://bigfrontend.dev/problem/compress-a-string

const compressString = (str) => {
	let result = '';
	let currentChar = '';
	let currentCount = 0;

	for (let i = 0; i <= str.length; i++) {
		if (currentChar === str[i]) {
			currentCount++;
		} else {
			if (currentCount > 0) {
				if (currentCount === 1) {
					result += currentChar;
				} else {
					result += currentChar + currentCount;
				}
			}

			currentChar = str[i];
			currentCount = 1;
		}
	}
	return result;
};

console.log(compressString('aabcccccaaa')); // a2bc5a3
console.log(compressString('aabbcc')); // a2b4c2
console.log(compressString('aaabba')); // a3b2a

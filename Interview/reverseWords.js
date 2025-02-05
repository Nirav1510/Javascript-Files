function reverseWords(sentence) {
	let words = sentence.split(' ');
	let left = 0,
		right = words.length - 1;

	while (left < right) {
		[words[left], words[right]] = [words[right], words[left]];

		left++;
		right--;
	}

	return words.join(' ');
}

// Example usage
console.log(reverseWords('Hello World from JavaScript'));
// Output: "JavaScript from World Hello"

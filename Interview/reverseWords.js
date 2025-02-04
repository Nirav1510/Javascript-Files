function reverseWords(sentence) {
	let words = sentence.split(' ');
	let left = 0,
		right = words.length - 1;

	// Swap words using two pointers
	while (left < right) {
		let temp = words[left];
		words[left] = words[right];
		words[right] = temp;

		left++;
		right--;
	}

	return words.join(' ');
}

// Example usage
console.log(reverseWords('Hello World from JavaScript'));
// Output: "JavaScript from World Hello"

// Que. Write a function that determines if two strings are anagrams of each other or not

const isAnagrams = (str1, str2) => {
	// Remove non-alphanumeric characters and convert to lowercase
	str1 = str1.replace(/[^\w]/g, '').toLowerCase();
	str2 = str2.replace(/[^\w]/g, '').toLowerCase();

	if (str1.length !== str2.length) return false;

	const sortedStr1 = str1.split('').sort().join('');
	const sortedStr2 = str2.split('').sort().join('');

	return sortedStr1 === sortedStr2;
};

function areAnagrams(str1, str2) {
	// Remove non-alphanumeric characters and convert to lowercase
	str1 = str1.replace(/[^\w]/g, '').toLowerCase();
	str2 = str2.replace(/[^\w]/g, '').toLowerCase();

	// If lengths differ, they cannot be anagrams
	if (str1.length !== str2.length) {
		return false;
	}

	// Create frequency counter objects for each string
	const charCount1 = {};
	const charCount2 = {};

	// Count characters in the first string
	for (let char of str1) {
		charCount1[char] = (charCount1[char] || 0) + 1;
	}

	// Count characters in the second string
	for (let char of str2) {
		charCount2[char] = (charCount2[char] || 0) + 1;
	}

	// Compare the character counts of both strings
	for (let char in charCount1) {
		if (charCount1[char] !== charCount2[char]) {
			return false;
		}
	}

	return true;
}

console.log(areAnagrams('listen', 'silent')); // Output: true
console.log(isAnagrams('listen', 'silent')); // Output: true

console.log(areAnagrams('hello', 'world')); // Output: false
console.log(isAnagrams('hello', 'world')); // Output: false

console.log(areAnagrams('Dormitory', 'dirty room')); // Output: true
console.log(isAnagrams('Dormitory', 'dirty room')); // Output: true

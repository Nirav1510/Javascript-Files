// https://bigfrontend.dev/problem/remove-characters

function removeChars(s) {
	let stack = [];

	for (char of s) {
		if (stack.length && char === 'c' && stack[stack.length - 1] === 'a') {
			stack.pop();
		} else if (char !== 'b') {
			stack.push(char);
		}
	}

	return stack.join('');
}

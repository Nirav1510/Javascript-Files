// https://bigfrontend.dev/problem/decode-message

function decode(message) {
	let row = 0,
		col = 0;

	const colLength = message[0]?.length;
	let ans = '',
		step = 1;

	while (col < colLength) {
		ans = ans + message[row][col];

		if (!message[row + step]) {
			step = step * -1;
		}

		row = row + step;
		col++;
	}
	return ans;
}

const message = [
	['a', 'b', 'c'],
	['d', 'e', 'f'],
	['g', 'h', 'i'],
	['j', 'k', 'l'],
];

console.log(decode(message));

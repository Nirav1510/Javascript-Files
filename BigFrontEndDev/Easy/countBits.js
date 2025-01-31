// https://bigfrontend.dev/problem/how-many-1s-in-binary

const countBits = (n) => {
	let count = 0;

	while (n) {
		count += n & 1;
		n = n >> 1;
	}
	return count;
};

console.log(countBits(10));

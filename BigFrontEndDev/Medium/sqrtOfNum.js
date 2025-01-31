// https://bigfrontend.dev/problem/implement-Math-sqrt

function mySqrt(x) {
	if (x < 0 || isNaN(x)) {
		return NaN;
	}
	if (x == 1) {
		return 1;
	}
	let low = 1;
	let high = x / 2;

	while (low <= high) {
		let mid = Math.floor((low + high) / 2);
		let guess = mid * mid;
		if (guess == x) {
			return mid;
		}
		if (guess < x) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}
	return high;
}

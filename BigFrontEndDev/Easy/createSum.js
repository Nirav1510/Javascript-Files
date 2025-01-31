// https://bigfrontend.dev/problem/create-a-sum

function sum(num) {
	function newSum(num2) {
		if (num2) {
			return sum(num + num2);
		} else {
			return num;
		}
	}

	newSum.valueOf = () => num;
	console.log(num);
	return newSum;
}

const sum1 = sum(1);
sum1(2) == 3; // true
sum1(3) == 4; // true
sum(1)(2)(3) == 6; // true
sum(5)(-1)(2) == 6; // true

const arr = [1, 2, 3, 4, 5, 6];

Array.prototype.myMap = function (cb) {
	let ans = [];
	for (let i = 0; i < this.length; i++) {
		ans.push(cb(this[i], i, arr));
	}
	return ans;
};

Array.prototype.myFilter = function (cb) {
	let ans = [];
	for (let i = 0; i < this.length; i++) {
		if (cb(this[i])) {
			ans.push(this[i]);
		}
	}
	return ans;
};

Array.prototype.myReduce = function (cb, initialValue) {
	let accumulator = initialValue;

	for (let i = 0; i < this.length; i++) {
		accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
	}
	return accumulator;
};

const sum = arr.myReduce((a, b) => a + b, 0);

console.log(sum);

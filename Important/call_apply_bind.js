// call apply bind polyfills

Function.prototype.myCall = function (context = {}, ...args) {
	if (typeof this !== 'function') {
		throw new Error(this + 'Error');
	}

	context.fn = this;
	context.fn(...args);
};

Function.prototype.myApply = function (context = {}, args) {
	if (typeof this !== 'function') {
		throw new Error(this + 'Error');
	}

	if (!Array.isArray(args)) {
		throw new Error(args + 'args is not an array');
	}

	context.fn = this;
	context.fn(...args);
};

Function.prototype.myBind = function (context = {}, ...args) {
	if (typeof this !== 'function') {
		throw new Error(this + 'Error');
	}

	context.fn = this;

	return function (...newArgs) {
		return context.fn(...args, ...newArgs);
	};
};

const car1 = {
	color: 'red',
	company: 'Ferrari',
};

const purchaseCar = function (currency, price) {
	console.log(this.color + ' ' + this.company + ' ' + currency + ' ' + price);
};

purchaseCar.myCall(car1, 'EUR', 1001);
purchaseCar.myApply(car1, ['INR', 2002]);
purchaseCar.myBind(car1, '$')(1000);

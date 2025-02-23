const MY_TIMERS = {
	timeoutIds: [], //global timeout id arrays

	//create a MY_TIMERS's timeout
	setTimeout: function (fn, delay) {
		let id = setTimeout(fn, delay);
		this.timeoutIds.push(id);
		return id;
	},

	//MY_TIMERS's clearAllTimeout
	clearAllTimeout: function () {
		while (this.timeoutIds.length) {
			clearTimeout(this.timeoutIds.pop());
		}
	},
};

MY_TIMERS.setTimeout(() => console.log('timeout'), 100);
MY_TIMERS.setTimeout(() => console.log('timeout2'), 500);
MY_TIMERS.setTimeout(() => console.log('timeout1'), 1000);
MY_TIMERS.setTimeout(() => console.log('timeout3'), 1500);

MY_TIMERS.clearAllTimeout();

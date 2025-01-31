// https://bigfrontend.dev/problem/what-is-composition-create-a-pipe

function pipe(funcs) {
	return function (args) {
		let result = args;

		for (let f of funcs) {
			result = f.call(this, result);
		}
		return result;
	};
}

// print number till x second

const a = () => {
	for (var i = 0; i < 5; i++) {
		function closure(x) {
			setTimeout(() => {
				console.log(x);
			}, i * 1000);
		}
		closure(i);
	}
};

a();

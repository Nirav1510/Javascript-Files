const solve = (ans, ip, op, idx) => {
	if (idx === ip.length) {
		ans.push(op);
		return;
	}

	let op1 = op + ip[idx];
	let op2 = op + ip[idx].toUpperCase();

	solve(ans, ip, op1, idx + 1);
	solve(ans, ip, op2, idx + 1);
};

const permutationWithCaseChange = (s) => {
	let ans = [];
	let op = '';

	solve(ans, s, op, 0);
	console.log('ans', ans);
	return ans;
};

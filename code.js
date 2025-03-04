async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}
console.log('script start');

async function async2() {
	console.log('async2');
}

setTimeout(function () {
	console.log('setTimeout');
}, 0);

new Promise(function (resolve) {
	console.log('promise1');
	resolve();
}).then(function () {
	async1();
	console.log('promise2');
});

console.log('script end');

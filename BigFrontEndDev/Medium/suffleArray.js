// https://bigfrontend.dev/problem/can-you-shuffle-an-array

const fisherYaleShuffleArray = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
};

console.log(fisherYaleShuffleArray([1, 2, 3, 4, 5]));

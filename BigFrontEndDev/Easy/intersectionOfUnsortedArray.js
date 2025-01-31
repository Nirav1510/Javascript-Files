// https://bigfrontend.dev/problem/array-intersect

function intersectionOfUnsortedArray(arr1, arr2) {
	let ans = [];
	const setMap = new Set(arr1);

	for (let i of arr2) {
		if (setMap.has(i)) {
			ans.push(i);
			setMap.delete(i);
		}
	}
	return ans;
}

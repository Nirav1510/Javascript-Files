// https://bigfrontend.dev/problem/reorder-array-with-new-indexes

const A = ['A', 'B', 'C', 'D', 'E', 'F'];
const B = [1, 5, 4, 3, 2, 0];
// ans = ["F", "A", "E", "D", "C", "B"];

function sort(items, newOrder) {
	const result = [];
	for (let i = 0; i < items.length; i++) {
		result[newOrder[i]] = items[i];
	}
	items.length = 0;
	items.push(...result);

	return items;
}

// with O(1) space
function sortWithOneSpace(items, newOrder) {
	for (let i = 0; i < newOrder.length; i++) {
		while (newOrder[i] !== i) {
			const to = newOrder[i];
			[newOrder[i], newOrder[to]] = [newOrder[to], newOrder[i]];
			[items[i], items[to]] = [items[to], items[i]];
		}
	}
	return items;
}

// console.log("sort", sort(A, B));
console.log('sortWithOneSpace', sortWithOneSpace(A, B));

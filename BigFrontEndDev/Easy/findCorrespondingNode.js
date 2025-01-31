// https://bigfrontend.dev/problem/find-corresponding-node-in-two-identical-DOM-tree

const findCorrespondingNode = (rootA, rootB, target) => {
	const stackA = [rootA];
	const stackB = [rootB];

	while (stackA.length) {
		currentA = stackA.pop();
		currentB = stackB.pop();

		if (currentA === target) {
			return currentB;
		}

		stackA.push(...currentA.children);
		stackB.push(...currentB.children);
	}
};

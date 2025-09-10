function validRelationship(list) {
	const managerSet = new Set();
	const reporteeSet = new Set();

	// 1. Check for self-manager
	for (let [manager, reportee] of list) {
		if (manager === reportee) return false;
		managerSet.add(manager);
		reporteeSet.add(reportee);
	}

	// 2. Find the ultimate leader (person who is manager but never a reportee)
	const leaders = [...managerSet].filter((m) => !reporteeSet.has(m));
	if (leaders.length !== 1) return false;

	const leader = leaders[0];

	// 3. Check connectivity (all members connected to the leader)
	const allMembers = new Set([...managerSet, ...reporteeSet]);

	// Build adjacency list
	const graph = {};
	for (let [manager, reportee] of list) {
		if (!graph[manager]) graph[manager] = [];
		graph[manager].push(reportee);
	}

	// DFS from leader
	const visited = new Set();
	function dfs(node) {
		if (visited.has(node)) return;
		visited.add(node);
		if (graph[node]) {
			for (let child of graph[node]) dfs(child);
		}
	}
	dfs(leader);

	// If not all members visited, then disconnected
	return visited.size === allMembers.size;
}

// ✅ Test cases
console.log(
	validRelationship([
		['Alice', 'Bob'],
		['Alice', 'Charlie'],
		['Bob', 'David'],
		['Bob', 'Eve'],
	])
); // true

console.log(
	validRelationship([
		['Alice', 'Bob'],
		['Alice', 'Charlie'],
		['Bob', 'David'],
		['Bob', 'Eve'],
		['Nirav', 'Daya'],
	])
); // false

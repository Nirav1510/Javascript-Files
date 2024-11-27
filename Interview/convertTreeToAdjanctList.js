function convertToAdjList(tree) {
  const adjList = {};

  // Helper function to recursively build the adjacency list
  function traverse(node) {
    // Ensure the node is in the adjacency list
    adjList[node.value] = [];

    // Traverse children
    node.children.forEach((child) => {
      adjList[node.value].push(child.value); // Add child to current node's list
      traverse(child); // Recursively add child's children
    });
  }

  // Start the traversal from the root node
  traverse(tree);

  return adjList;
}
const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        {
          value: 4,
          children: [],
        },
        {
          value: 5,
          children: [],
        },
      ],
    },
    {
      value: 3,
      children: [],
    },
  ],
};

const adjList = convertToAdjList(tree);
console.log(adjList);

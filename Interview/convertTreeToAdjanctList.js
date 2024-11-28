function convertToAdjList(tree) {
  const adjList = {};

  function traverse(node) {
    adjList[node.value] = [];

    node.children.forEach((child) => {
      adjList[node.value].push(child.value);
      traverse(child);
    });
  }

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

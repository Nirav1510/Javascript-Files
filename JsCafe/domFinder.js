const getPathFromChildToParent = (child, parent) => {
  let currentNode = child;
  const pathArray = [];

  while (currentNode !== parent) {
    const parentElement = currentNode.parentNode;
    const childrenArray = Array.from(parentElement.children);
    const index = childrenArray.indexOf(currentNode);

    pathArray.push(index);
    currentNode = parentElement;
  }

  return pathArray;
};

const getValueFromPath = (root, path) => {
  let currentNode = root;

  while (path.length > 0) {
    const index = path.pop();
    currentNode = currentNode.children[index];
  }
  return currentNode.innerText;
};

const findNodeValue = () => {
  const rootA = document.getElementById("rootA");
  const rootB = document.getElementById("rootB");
  const nodeA = document.querySelector("#nodeA");
  console.log(nodeA.innerText);

  const path = getPathFromChildToParent(nodeA, rootA);

  const ans = getValueFromPath(rootB, path);
  console.log("ans", ans);
  return ans;
};

console.log(findNodeValue());

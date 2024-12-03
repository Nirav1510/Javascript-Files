// https://bigfrontend.dev/problem/call-APIs-with-pagination

// fetchList is provided for you
// const fetchList = (since?: number) =>
//   Promise<{items: Array<{id: number}>}>

const fetchListWithAmount = async (amount = 5) => {
  // your code here
  let result = [],
    cursor;

  while (result.length < amount) {
    const { items } = await fetchList(cursor);
    if (items.length > 0) {
      result.push(...items);
      cursor = items[items.length - 1].id;
    } else {
      break;
    }
  }

  return result.slice(0, amount);
};

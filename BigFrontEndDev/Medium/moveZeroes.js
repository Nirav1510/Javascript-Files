// https://bigfrontend.dev/problem/move-zeros

/**
 * @param {Array<any>} list
 * @returns {void}
 */

const moveZeros = (list) => {
  let idx = 0;

  for (let i = 0; i < list.length; i++) {
    if (list[i] !== 0) {
      list[idx] = list[i];
      idx++;
    }
  }

  while (idx < list.length) {
    list[idx] = 0;
    idx++;
  }
};

const list = [0, 1, 0, 3, 12];
moveZeros(list);
console.log(list);

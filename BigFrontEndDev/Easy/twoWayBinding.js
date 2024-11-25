// https://bigfrontend.dev/problem/two-way-binding

function model(state, element) {
  element.value = state.value;

  Object.defineProperty(state, "value", {
    get: () => element.value,
    set: (value) => (element.value = value),
  });
}

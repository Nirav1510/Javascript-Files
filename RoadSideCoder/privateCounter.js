// Que. How would you use a closure to create a private counter?

function Counter() {
  var _counter = 0;

  function add(num) {
    _counter += num;
  }

  function subtract(num) {
    _counter -= num;
  }

  function currentValue() {
    return "current value: " + _counter;
  }

  return { add, subtract, currentValue };
}

const x = new Counter();
const y = new Counter();

x.add(5);
x.add(10);
x.subtract(3);
console.log(x.currentValue());

y.add(5);
y.add(1);
y.subtract(2);
console.log(y.currentValue());

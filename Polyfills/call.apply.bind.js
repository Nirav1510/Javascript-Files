let car1 = {
  color: "red",
  company: "Ferrari",
};

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Error");
  }
  context.fn = this;
  context.fn(...args);
};

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Error");
  }

  context.fn = this;

  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + "Error");
  }

  if (!Array.isArray(args)) {
    throw new Error(args + "args is not an array");
  }

  context.fn = this;
  context.fn(...args);
};

function purchaseCar(currency, price) {
  console.log(this.color + " " + this.company + " " + currency + " " + price);
}

// purchaseCar.myCall(car1, "$", 1000000);
purchaseCar.myApply(car1, ["$", 1000000]);
purchaseCar.myBind(car1, "$", 1000000);

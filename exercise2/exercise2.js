
export default {
  case1,
  case2,
  case3,
}

function case1() {
  const array = [1,2,4];
  const result = []
  array.forEach(function (i) { result.push(i + 1); });
  return result;
}

function case2() {
  var self = this;
  self.numbers = [15,7,25];
  self.fives = [];
  this.numbers.forEach(function (number) {
      if (number % 5 === 0)
          self.fives.push(number); // try to replace self by this
  });
  return this.fives;
}

function case3(x, y, z) {
  if (y === undefined)
      y = 7;
  if (z === undefined)
      z = 42;
  return x + y + z;
}
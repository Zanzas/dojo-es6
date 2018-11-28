
export default {
  case1,
  case2,
  case3,
  case4,
  case6,
}

function case1(a, b) {
  var args = Array.from(arguments);
  let sum = 0;
  args.forEach(argument => {
    sum += argument;
  });
  return sum;
}

function case2(facteur) {
  const array = Array.prototype.slice.call(arguments, 1);
  return array.map(element => facteur * element);
}

function case3() {
  const params = [ 8,1,5, 7 ];
  const other = [ 1, 2 ].concat(params); // [ 1, 2, 8, 1, 5, 7 ]

  return case1.apply(undefined, other);
}

function case4(message) {
  var str = "foo";
  return str.split("");
}

// transform user store code into code label
function case6(user) {
  const copy = Object.assign({}, user); // Dumb rule ===> Props are never modified !!
  const getLabelFromCode = (code) =>  code === 6 ? 'Lille' : 'Other';
  copy.store = getLabelFromCode(copy.store);
  return copy
}
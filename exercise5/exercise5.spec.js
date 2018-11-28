
describe('Excercie 5', () => {
  it('Case 1 - Get only value above 5', () => {
    const array = [0,7,9,2,3];

    // use es6 filter
    const elementsAboveFive = array;

    expect(elementsAboveFive).toEqual([7,9]);
  });

  it('Case 2 - Do sum value', () => {
    const array = [0,7,9,2,3];

    // use es6 reduce
    const sum = 0;

    expect(sum).toEqual(21);
  });

  it('Case 3 - Test if array has value above ten', () => {
    const array = [0,7,9,2,3];

    // use es6 reduce
    const hasAllElementsAboveTen = array;

    expect(hasAllElementsAboveTen).toBeFalsy();
  });

  it('Case 3 - Test if array has value above ten', () => {
    const array = [0,7,9,2,3];

    // use es6 reduce
    const hasAnElementEven = array;

    expect(hasAnElementEven).toBeTruthy();
  });

});


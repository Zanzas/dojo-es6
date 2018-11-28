import exercise3 from './exercise3';

describe('Excercie 3', () => {
  // Petite explication sur le rest Operator
  it('Case 1 - rest operator', () => {
    expect(exercise3.case1(1,2,7)).toEqual(10);
  });

  it('Case 2 - rest operator', () => {
    expect(exercise3.case2(3,1,2,7)).toEqual([3,6,21]);
  });

  it('Case 3 - spread operator with array', () => {
    expect(exercise3.case3()).toEqual(24);
  });

  it('Case 3 - spread operator with string', () => {
    expect(exercise3.case4('foo')).toEqual(
      [ "f", "o", "o" ]
    );
  });

  it('Case 4 - spread operator copy array or object', () => {
    console.log('------------- case 4 ------------------');

    var arr = [1, 2, 3];
    var arr2 = [...arr];
    arr2.push(4);

    console.log(arr2); // [1, 2, 3, 4]
    console.log(arr);  // [1, 2, 3] (inchangé)
  });

  it('Case 5 - spread operator copy array or object', () => {
    console.log('------------- case 5 ------------------');

    var obj1 = { toto: 'truc', x: 42 };
    var obj2 = { toto: 'bidule', y: 13 };
    
    var clone = { ...obj1 };
    // Object { toto: 'truc', x: 42 }
    console.log(clone);

    var fusion = { ...obj1, ...obj2 };
    // Object { toto: 'bidule', x: 42, y: 13 };
    console.log(fusion);

  });

  it('Case 6 - use case', () => {

    // Arrange
    const user = { firstName: 'Youssef', store: 6 };
    const expected = { firstName: 'Youssef', store: 'Lille' };
    //Act
    const result = exercise3.case6(user); // result is bad naming convention avoid

    //Assert
    expect(result).toEqual(expected);
    
  });
});


import exercise4 from './exercise4';

describe('Excercie 4', () => {
  // Petite explication sur le rest Operator
  it('Case 1 - String interpolation', () => {
    expect(exercise4.case1()).toEqual('Hello Foo, want to buy 7 Bar for a total of 294 bucks?'
    );
  });

});


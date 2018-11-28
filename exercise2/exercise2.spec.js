import exercise2 from './exercise2';

describe('Excercie 2', () => {
  it('Case 1 - Use Arrow Function', () => {
    const expected = [2,3,5]
    expect(exercise2.case1()).toEqual(expected);
  });

  // Explication des différentes écritures avec Arrow Function

  // Explication sur le this en JS
  it('Case 2 - This and Arrow Function', () => {
    const expected = [15,25]
    expect(exercise2.case2()).toEqual(expected);
  });

  it('Case 3 - default parameters', () => {
    expect(exercise2.case3(1)).toEqual(50);
  });
});
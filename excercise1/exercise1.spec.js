
describe('Excercie 1', () => {
  it('Case 1 - Strange way var is working', () => {
    console.log('------------- case 1 ------------------');   // undefined

    console.log(localVariable);   // undefined
    var localVariable = 5;
    console.log(localVariable);   // 5
  })

  it('Case 2 - Strange way var is working', () => {
    console.log('------------- case 2 ------------------');   // undefined

      // function scope
    var oldLocalVariable = 5;
    
    if (true) {
      // block scope
      var oldNestedLocalVariable = 6;
      
      console.log(oldNestedLocalVariable); // 6
    }
    
    // those are stil valid
    console.log(oldLocalVariable); // 5
    
    // What Oo ???
    console.log(oldNestedLocalVariable); // 6
  })

  it('Case 3 - Let & const save US', () => {
    console.log('------------- case 3 ------------------');

    let blockScopedVariable = 10;
    
    console.log(blockScopedVariable);  // 10
    
    if (true) {
      let blockScopedVariable = 5;
      
      console.log(blockScopedVariable);  // 5
    }
    
    console.log(blockScopedVariable);  // 10
  })
})
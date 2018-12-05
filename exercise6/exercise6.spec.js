// 75: Promise - basics 

describe('a Promise represents an operation that hasn`t completed yet, but is expected in the future', function() {

    it('`Promise` is a global function', function() {
      const expectedType = 'function';
      expect(typeof Promise).toBe('function');
    });
  
    describe('the constructor', function() {
    
      it('instantiating it without params throws', function() {
        const fn = () => { new Promise() }
        expect(fn).toThrow();
      });  
      
      it('expects a function as parameter', function() {
        const param = () => {};
        expect(() => { new Promise(param); }).not.toThrow();
      });  
      
    });
  
    describe('simplest promises', function() {
    
      it('resolve a promise by calling the `resolve` function given as first parameter', function(done) {
        let promise = new Promise((resolve) => {
          resolve();
        });
        
        promise
          .then(() => done())
          .catch(() => done(new Error('The promise is expected to resolve.')));
      });
    
      it('the `resolve` function can return a value, that is consumed by the `promise.then()` callback', function(done) {
        let promise = new Promise((resolve) => {
          resolve(42);
        });
        
        promise
          .then(value => {expect(value).toBe(42); done(); })
          .catch(() => done(new Error('The promise is expected to resolve with 42!')));
      });
    
      it('rejecting a promise is done by calling the callback given as 2nd parameter', function(done) {
        let promise = new Promise((resolve, reject) => {
          reject();
        });
        
        promise
          .then(() => done(new Error('The promise is expected to be rejected.')))
          .catch(() => done());
      });
  
    });
  
    describe('an asynchronous promise', function() {
    
      it('can resolve later, also by calling the first callback', function(done) {
        let promise = new Promise((resolve) => {
          setTimeout(() => resolve(), 100);
        });
        
        promise
          .then(() => done())
          .catch(() => done(new Error('The promise is expected to resolve.')));
      });
    
      it('reject it at some later point in time, calling the 2nd callback', function(done) {
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => reject(), 100);
        });
        
        promise
          .then(() => done(new Error('The promise is expected to be rejected.')))
          .catch(() => done());
      });
  
    });
  });
  
  // 76: Promise - creation 
  
  describe('a promise can be created in multiple ways', function() {
    
    describe('`Promise.all()` returns a promise that resolves when all given promises resolve', function() {
      
      it('returns all results', function(done) {
        const promise = Promise.all([
          new Promise(resolve => resolve(1)),
          new Promise(resolve => resolve(2))
        ]);
        
        promise
          .then(value => { expect(value).toEqual([1,2]); done(); })
          .catch(e => done(new Error(e)));
      });
      
      it('is rejected if one rejects', function(done) {
        const promise = Promise.all([
          new Promise(resolve => reject(1))
        ]);
        
        promise
          .then(() => done(new NotRejectedError()))
          .catch(() => done());
      });
      
    });
    
    describe('`Promise.race()` returns the first settled promise', function() {
      
      it('if it resolves first, the promises resolves', function(done) {
        const lateRejectedPromise = new Promise((resolve, reject) => setTimeout(reject, 100));
        const earlyResolvingPromise = new Promise(resolve => resolve('1st :)'));
        const promise = Promise.race([lateRejectedPromise, earlyResolvingPromise]);
        
        promise
          .then(value => { expect(value).toBe('1st :)'); done(); })
          .catch(e => done(new Error('Expected to resolve, but failed with: ' + e)));
      });
  
      it('if one of the given promises rejects first, the returned promise is rejected', function(done) {
        const earlyRejectedPromise = new Promise((resolve, reject) => reject('I am a rejector'));
        const lateResolvingPromise = new Promise(resolve => setTimeout(resolve, 10));
        const promise = Promise.race([earlyRejectedPromise, lateResolvingPromise]);
        
        promise
          .then(() => done(new NotRejectedError()))
          .catch(value => { expect(value).toBe('I am a rejector'); done(); })
          .catch(done);
      });
      
    });
  });
  
  class NotRejectedError extends Error {
    constructor() {
      super();
      this.message = 'Expected promise to be rejected.';
    }
  }
  
  // 77: Promise - chaining 
  
  describe('chaining multiple promises can enhance readability', () => {
  
    describe('prerequisites for understanding', function() {
      
      it('reminder: the test passes when a fulfilled promise is returned', function() {
        return Promise.resolve('I should fulfill.');
      });
    
      it('a function given to `then()` fulfills (if it doesnt throw)', function() {
        const beNice = () => { return 'I am nice' };
        return Promise.resolve()
          .then(beNice)
          .then(niceMessage => expect(niceMessage).toBe('I am nice'));
      });
      
    });
  
    describe('chain promises', function() {
      
      const removeMultipleSpaces = string => string.replace(/\s+/g, ' ');
      
      it('`then()` receives the result of the promise it was called on', function() {
        const wordsPromise = Promise.resolve('one   space     between each     word');
        return wordsPromise
          .then(actual => {expect(actual).toBe('one space between each word')})
        ;
      });
      
      const appendPeriod = string => `${string}.`;
      
      it('multiple `then()`s can be chained', function() {
        const wordsPromise = Promise.resolve('Sentence without       an end');
        return wordsPromise
          .then(actual => {expect(actual).toBe('Sentence without an end.')})
        ;
      });
      
      const trim = string => string.replace(/^\s+/, '').replace(/\s+$/, '');
      
      it('order of the `then()`s matters', function() {
        const wordsPromise = Promise.resolve('Sentence without       an end ');
        return wordsPromise
          .then(actual => {expect(actual).toBe('Sentence without an end.')})
        ;
      });
      
      const asyncUpperCaseStart = (string, onDone) => {
        const format = () => onDone(string[0].toUpperCase() + string.substr(1));
        setTimeout(format, 100);
      };
    
      it('any of the things given to `then()` can resolve asynchronously (the real power of Promises)', function() {
        const wordsPromise = Promise.resolve('sentence without an end');
        return wordsPromise
          .then(string => new Promise(resolve => asyncUpperCaseStart(string, resolve)))
          .then(string => new Promise(resolve => setTimeout(() => resolve(appendPeriod(string)), 100)))
          .then(actual => {expect(actual).toBe('Sentence without an end.')})
        ;
      });
    
      it('also asynchronously, the order still matters, promises wait, but don`t block', function() {
        const wordsPromise = Promise.resolve('trailing space   ');
        return wordsPromise
          .then(actual => {expect(actual).toBe('Trailing space.')})
        ;
      });
      
    });
  
  });
  
  // 79: Promise - catch
  
  describe('`catch()` returns a Promise and deals with rejected cases only', () => {
  
    describe('`catch` method basics', () => {
  
      it('catches only promise rejections', (done) => {
        const promise = Promise.reject();
        promise
          .then(() => { done('Should not be called!'); })
          .catch(done);
      });
  
      it('returns a new promise', () => {
        const whatToReturn = () => Promise.reject();
        const promise = Promise.reject();
        return promise.catch(() =>
          whatToReturn
        );
      });
  
      it('converts it`s return value into a promise', () => {
        const p = Promise.reject();
        const p1 = p.catch(() => 'promise?');
  
        return p1.then(result => expect(result).toBe('promise?'));
      });
  
      it('the first parameter is the rejection reason', () => {
        const p = Promise.reject('oops');
  
        return p.catch(reason => {
          expect(reason).toBe('oops');
        });
      });
    });
  
    describe('multiple `catch`es', () => {
      it('only the first `catch` is called', () => {
        const p = Promise.reject('1');
        const p1 = p
            .catch(reason => `${reason} AND 2`)
            .catch(reason => `${reason} AND 3`)
          ;
  
        return p1.then(result =>
          expect(result).toBe('1 AND 2')
        );
      });
  
      it('if a `catch` throws, the next `catch` catches it', () => {
        const p = Promise.reject('1');
        const p1 = p
            .catch(reason => { throw Error(`${reason} AND 2`) })
            .catch(err => `${err.message} AND 3`)
            .catch(err => `${err} but NOT THIS`)
          ;
  
        return p1.then(result =>
          expect(result).toBe('1 AND 2 AND 3')
        );
      });
    });
  
  });
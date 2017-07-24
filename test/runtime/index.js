class Test {

  constructor() {
    this.suites = [];
  }

  describe(name, callback) {
    this.suites.push(new Suite(name););
    callback();
  };

  before(callback) {
    currentSuite.before = callback;
  };

  after(callback) {
    currentSuite.after = callback;
  };

  it(name, callback) {
    currentSuite.tests.push({name: name, func: callback});
  };

  run() {
    this.suites.forEach(function(suite) {
      suite.before();
      suite.tests.forEach(function(test) {
        test.func();
      });
      suite.after();
    });
  };

  currentSuite() {
    return this.suites[this.suites.length-1];
  }
}

class Suite {
  constructor(name) {
    this.name = name; 
    this.tests = [];
    this.before = null;
    this.after = null;
  }
}

const t = new Test();

module.exports = Test;

function onClick() {
  console.log("called!")
  new customPromise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.floor(Math.random() * 10);
      num % 2 > 0 ? resolve("Resolved " + num) : reject("Rejected " + num);
    }, 0)
  }).then(text => text + "!").then(text => text + "😊").then(display).catch(display);
}

function display(text) {
  document.getElementById("content").innerHTML = text;
}

const CUSTOM_PROMISE_STATE = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED"
}
class customPromise {
  constructor(executor) {
    this.customPromiseState = CUSTOM_PROMISE_STATE.PENDING;
    this.thens = [];
    this.resolvedData = null;
    this.catch = null;
    executor(this.resolver, this.rejector);
  }
  resolver = resolvedData => {
    if (this.customPromiseState !== CUSTOM_PROMISE_STATE.PENDING) {
      return;
    }
    this.customPromiseState = CUSTOM_PROMISE_STATE.FULFILLED;

    while(this.thens.length) {
      const thenFunction = this.thens.shift();
      this.resolvedData = thenFunction(this.resolvedData || resolvedData);
    }
  };
  rejector = rejectedData => {
    if (this.customPromiseState === CUSTOM_PROMISE_STATE.PENDING) {
      this.catch && this.catch(rejectedData);
    }
    this.customPromiseState = CUSTOM_PROMISE_STATE.REJECTED;
  };
  then(thenFunction) {
    this.thens.push(thenFunction);
    return this;
  }
  catch(catches) {
    this.catch = catches;
    return this;
  }
}

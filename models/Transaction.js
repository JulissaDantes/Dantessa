class Transaction {
  constructor(originator, inputs, outputs) {
	this.originator = originator
    this.inputs = inputs;
    this.outputs = outputs;
  }
}

module.exports = Transaction;
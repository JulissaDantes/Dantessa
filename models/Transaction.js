const Account = require('./Account');
const UTXO = require('./UTXO');
class Transaction {
  constructor(originator, recipient, inputs, outputs) {
	  this.originator = originator
    this.recipient = recipient;
    this.inputs = inputs;
    this.outputs = outputs;
  }
  execute(){
    if(this.inputs.length > this.outputs.filter(x => !x.spent).length){
      return false;
    }
    for(let i=0;i<this.inputs.length;i++){
      this.originator.utxos[i].spend();    //spend utxos
    }

    //recalculate balance based on current utxos
    this.originator.calcBalance();
    this.recipient.utxos.push(new UTXO(this.recipient.publicKey, Number(this.inputs.filter(x => !x.spent).reduce((a, b) => a + (b.amount || 0), 0))));
    this.recipient.calcBalance();
    return true;
  }
}

module.exports = Transaction;
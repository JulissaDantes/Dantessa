class Account {
    constructor(publicKey, privateKey,balance,utxos) {
      this.publicKey = publicKey;
        this.balance = balance;
        this.utxos = utxos;
        this.privateKey = privateKey;
    }
    calcBalance(){
      this.balance = this.utxos.filter(x => !x.spent).reduce((a, b) => a + (b.amount || 0), 0);
      console.log('New balance of ',this.publicKey,":",this.balance);
    }
  }
  
  module.exports = Account;
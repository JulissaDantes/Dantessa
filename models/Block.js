  
const SHA256 = require('crypto-js/sha256');
class Block {
  constructor(timestamp,nonce,txs) {
    this.timestamp = timestamp;//Date.now();
    this.nonce = nonce;
    this.txs = txs;
  }
  addTransaction(tx){
    this.txs.push(tx)
  }
  hash() {
    return SHA256(
      this.timestamp + "" +
      this.nonce + "" +
      JSON.stringify(this.txs)
    ).toString();
  }
}
  
module.exports = Block;
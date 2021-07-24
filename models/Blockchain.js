class Blockchain {
  constructor(blocks,utxo) {
    this.blocks = blocks;
    this.utxo = utxo;
  }
  addBlock(block) {
    this.blocks.push(block);
  }
  blockHeight() {
    return this.blocks.length;
  }
}

module.exports = Blockchain;
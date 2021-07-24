const Block = require('../models/Block');
const Blockchain = require('../models/Blockchain');
const fs = require('fs');
const TARGET_DIFFICULTY = BigInt("0x0" + "b".repeat(63));


let mining = true;
mine();

function startMining() {
    mining = true;
    mine();
  }
  
  function stopMining() {
    mining = false;
  }

function mine(tx){

    const bcData = JSON.parse(fs.readFileSync("../data/blockchainState.json"));//blockchain state
    //create object from file
    let minedBlocks = []
    for(let block of bcData.blocks){
        let newBlock = new Block(block.timestamp,block.nonce,block.txs);
        minedBlocks.push(newBlock)
    }
    const blockchain =  new Blockchain(minedBlocks,bcData.utxo);
    console.log("blockchain object",blockchain)
    const blockData = JSON.parse(fs.readFileSync("../data/block.json"));//Working block not yet on the chain
    const timestamp = (blockData.timestamp !== '')?blockData.timestamp:Date.now();
    const block = new Block(timestamp,blockData.nonce,blockData.txs);    

    if(!mining) return;

    //save a minning block data in case we wont add it to the blockchain

    block.addTransaction(tx);
    console.log(block.txs.length);
    if(block.txs.length < 3){//Transaction limit per block
        console.log("im here with block",block);
        fs.writeFileSync("../data/block.json",(JSON.stringify(block)));//write info on block file
        return;
    }
    while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
      block.nonce++;
    }
    
    blockchain.addBlock(block);//write in file and also update 
    fs.writeFileSync("../data/blockchainState.json",(JSON.stringify(blockchain)));
    console.log(`Mined block #${blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);
}
  module.exports = {
    startMining,
    stopMining,
  };
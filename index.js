/*This is the start file of the app from here the full TX process will start and therefore the minning process*/
const Miner = require('./proofOfWork');
const Transaction = require('./models/Transaction');
const Account = require('./models/Account');
const UTXO = require('./models/UTXO');
const fs = require('fs');

let running = false;
 //get all accounts
 const data = JSON.parse(fs.readFileSync("./data/accounts.json"));

 const accounts = []
 for(account of data){
     let utxos = [];
     for(let i = 1;i<=account.balance;i++){
     //add utxos
         utxos.push(new UTXO(account.publicKey,1));
     }
     let newaccount = new Account(account.publicKey, account.privateKey, account.balance, utxos);
     accounts.push(newaccount);
 }

function main(){
   if(!running){
        const sender = accounts[getPseudoRandom(null,accounts.length-1,0)];
        const recipient = accounts[getPseudoRandom(accounts.indexOf(sender),accounts.length-1,0)];
        const transfering = getPseudoRandom(null,sender.balance-1, 1);//or minus gas price
        const input = [];//what is going to be spend
        for(let i = 1;i<=transfering;i++){
            input.push(new UTXO(sender.publicKey,1));
        }
        const output = sender.utxos; //what we have
        //generate tx with timer
        const tx = new Transaction(sender,recipient,input,output);
        console.log("sender's (",sender.publicKey,")current balance",sender.balance,"recipient's (",recipient.publicKey,"current balance",recipient.balance);
        const result = tx.execute();
        if(result){
            running = true;
            Miner.mine(tx);
            running = false;    
        }
    }
    setTimeout(main, 2500);//Every 5 seconds
}

function getPseudoRandom(excludedValue, top, bottom){
    let value = null;
    if(excludedValue){
        while(value === null || value === excludedValue){
            value = Math.floor( Math.random() * ( 1 + top - bottom ) )
        }
    }else{
        return Math.floor( Math.random() * ( 1 + top - bottom ) )
    }
    return value;
}

main();
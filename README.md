#For starters Dantessa is the name of the blockchain

##Key Notes
For the sake of simplicity the transactions limit per block on Dantessa is 3.
The blockchain state is being printed on the console.
It periodically sends a transaction to the blockchain, this is to simulate traffic and be able to mine without creating a GUI and manually processing transactions. These txs will also be printed and processed on the console.
It wont send the TX to be mined if the TX failed for any reason.
To start running a new chain just empty the blockChainState.json, block.json, and accounts.json files.

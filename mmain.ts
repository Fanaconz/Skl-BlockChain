const SHA256 = require('crypto-js/sha256');

class Block{
    index: number;
    timestamp: string;
    data: any;
    previousHash: string;
    hash: string;
    constructor(index: number, timestamp: string, data: any, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    private chain: Block[] = [];
    constructor(){
        this.chain = [this.createGenesisChain()];
    }

    createGenesisChain(){
        return new Block(0, "10/05/2024", "GenesisBlock", "0");
    }

    getLatestBlock(): Block{
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock: Block){
        newBlock.previousHash = this.getLatestBlock().hash;  // устанавливает предыдущий хеш
        newBlock.hash = newBlock.calculateHash();  //   вычисляет новый хеш
        this.chain.push(newBlock);  // pure idea
    }

    isChainValid(): boolean{
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let Sklyar = new BlockChain();
Sklyar.addBlock(new Block(1,"11/05/2024", { amount: 250}));
Sklyar.addBlock(new Block(2,"12/05/2024", { amount: 500}));

console.log('Is my BlockChain valid?' , Sklyar.isChainValid());
console.log(JSON.stringify(Sklyar, null, 2));
































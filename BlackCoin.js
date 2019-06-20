const SHA256=require('crypto-js/sha256');

class CryptoBlock
{
    constructor(index,timestamp,data,previousHash="")
    {
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }

    calculateHash()
    {
        return SHA256(this.index+this.timestamp+JSON.stringify(this.data).toString()+this.previousHash);
    }

}


class BlockChain
{
    constructor()
    {
        this.chain=[this.createGenesisBlock()];
    }

    createGenesisBlock()
    {
        return new CryptoBlock(0,"01/01/2019","Genesis Block","0");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock)
    {
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}


let mycoin=new BlockChain();
mycoin.addBlock(new CryptoBlock(1,"01/02/2019",{From:"Shubhu",To:"Sandesh",Amount:10000}))
mycoin.addBlock(new CryptoBlock(2,"02/03/2019",{From:"Shivam",To:"Omkar",Amount:900000}))

console.log(JSON.stringify(mycoin,null,4));
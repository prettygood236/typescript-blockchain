// class Block {
//   constructor(private data: string) {}
//   static hello() {
//     return 'hi';
//   }
// }
// // console.log(Block.hello()); //. static : instance 생성 (const block = new Block()) 없이 hello method 호출 가능

// document.querySelector;
// localStorage.getItem;

// // import { init, exit } from 'myPackage'; //. strict모드가 true이면 declaration file : js의 모양을 ts에게 설명해주는 파일 이 있어야 한다.
// import { init, exit } from './myPackage'; //. allowJs : true

// init({
//   url: 'true',
// });

// exit(1);

// import * as crypto from 'crypto';
import crypto from 'crypto'; //. esModuleInterop : true

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return '';
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    // return this.blocks; //. 보안상 치명적인 허점이 있다.!
    return [...this.blocks]; //. 배열의 데이터를 가진 새로운 배열을 리턴해주어야 한다.
  }
}

const blockchain = new Blockchain();

blockchain.addBlock('First one');
blockchain.addBlock('Second one');
blockchain.addBlock('Third one');
blockchain.addBlock('Fourth one');

// blockchain.getBlocks().push(new Block('xxxxxx', 11111, 'HACKEDDDDDDD')); //. 보안상 치명적인 허점이 있다.!

console.log(blockchain.getBlocks());

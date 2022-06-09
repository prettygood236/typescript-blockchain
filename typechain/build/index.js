var Block = /** @class */ (function () {
    function Block(data) {
        this.data = data;
    }
    Block.hello = function () {
        return 'hi';
    };
    return Block;
}());
// console.log(Block.hello()); //. static : instance 생성 (const block = new Block()) 없이 hello method 호출 가능

//* Implicit Types vs Explicit Types
{
  //- We should try to keep the explicit to a minimum.
  //- It's better to let typescript infer it so we can save keystrokes and time.

  let a = 'hello';
  // a = 1 //. -> error
  let c = [1, 2, 3];
  // c.push('1') //. -> error
  const player = {
    name: 'chan',
  };

  //. But in this case, it's better to use explicit type.
  let d: number[] = [];
  d.push(1);
}

//* Types of TS #1
{
  let a: number = 1;
  let b: string = 'i';
  let c: boolean = true;
  let aa: number[] = [1, 2];

  //- Alias
  type Name = string;
  type Age = number;
  type Player = {
    readonly name: Name; //- readonly
    age?: Age; //- Optional Parameter
  };

  const playerA: Player = {
    name: 'A',
  };
  if (playerA.age && playerA.age < 10) {
  }
  const playerB: Player = {
    name: 'B',
    age: 12,
  };

  // function playerMaker(name: string): Player {
  //   return {
  //     name,
  //   };
  // }
  const playerMaker = (name: string): Player => ({
    name,
  });
  const chan = playerMaker('chan');
  chan.age = 12;
  // chan.name = 'las'; //. Cannot assign to 'name' because it is a read-only property

  //- readonly
  const numbers: readonly number[] = [1, 2, 3, 4];
  // numbers.push(1); //. 'readonly'이므로 수정할 수 없다. (수정하지 않는 filter, map등은 가능하다.)
  const names: readonly string[] = ['1', '2'];
}

//* Types of TS #2
{
  //- Tuple : 최소길이를 가지고, 항상 특정 위치에 특정 타입이 있어야하는 array를 지정한다.
  const player: readonly [string, number, boolean] = ['chan', 1, true];
  // player[0] = 1; // Type 'number' is not assignable to type 'string'

  // ? array의 각 요소는 Implicit Types 지정이 안되는 것인가?
  const player2 = ['chan', 1, true];
  player2[0] = 1;
  // console.log(player2);

  //- undefined : undefined type이면 값도 undefined
  let a: undefined = undefined;
  type Player = {
    age?: number; //. Optional Parameter ?는 number 이거나 undefined라는 뜻의 단축어
  };

  //- null : null type이면 값도 null
  let b: null = null;

  //- any : Typescript의 보호장치로부터 빠져나오고 싶을 때 사용
  let arr = [];
  const c: any[] = [1, 2, 3, 4];
  const d: any = true;
  // console.log(c + d); // 이런 바보같은 짓이 가능해진다.
}

//* Types of TS #3
{
  //! Typescript의 중요한 포인트는 타입을 지정하고 Type Checker와 소통하여 바보같은 코드가 작성되지 않도록 보호받는 것이다.

  //- unknown : 변수의 타입을 아직 모를 때 사용. 그러면 typescript가 변수를 사용할 때 강제로 타입 확인작업을 시킨다.
  let a: unknown;
  // let b = a + 1; //. Operator '+' cannot be applied to types 'unknown' and '1'
  // 따라서 아래와 같이 작성할 수 있다.
  if (typeof a === 'number') {
    let b = a + 1;
  }
  if (typeof a === 'string') {
    let b = a.toUpperCase();
  }

  //- void : 함수가 아무것도 return하지 않을 때.
  // 굳이 explicate할 필요 없다.
  function hello() {
    console.log('x');
  }
  const f = hello();
  // f.toUpperCase(); //. Property 'toUpperCase' does not exist on type 'void'.

  //- never : 함수가 절대 return하지 않을 때 사용.
  function hi(): never {
    throw new Error('xxx');
  }
  function haha(name: string | number) {
    // name + 1; // name이 string일 수도 있기 때문에 불가하다.
    if (typeof name === 'string') {
      name; // string
    } else if (typeof name === 'number') {
      name; // number
    } else {
      name; //. never. This code is should never ever run.
    }
  }
}

{
  //* Implicit Types vs Explicit Types
  //- We should try to keep the explicit to a minimum.
  //- It's better to let typescript infer it so we can save keystrokes and time.

  let a = 'hello';
  // a = 1 // -> error
  let c = [1, 2, 3];
  // c.push('1') // -> error
  const player = {
    name: 'chan',
  };

  //- But in this case, it's better to use explicit type.
  let d: number[] = [];
  d.push(1);
}

{
  //* Types of TS #1
  let a: number = 1;
  let b: string = 'i';
  let c: boolean = true;
  let aa: number[] = [1, 2];

  //- Alias
  type Name = string;
  type Age = number;
  type Player = {
    name: Name;
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
}

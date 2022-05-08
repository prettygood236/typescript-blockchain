//* Call Signatures : 함수를 구현하기전에 함수 인자와 반환값의 타입을 만들어 함수가 어떻게 작동하는지 서술해 두는 것.
{
  function add(a: number, b: number) {
    return a + b;
  }
  // 인자의 type을 명시하는 코드를 줄이고 싶다면?
  //- 함수의 call signature type 만들기.
  type Add = (a: number, b: number) => number;
  const add2: Add = (a, b) => a + b;
}

//* Overloads : 함수가 서로 다른 여러개의 call signature를 가지고 있는 것.
{
  //- Overloading Example in Next.js
  //. string으로 보낼 수도 있고, object로 보낼 수도 있다.
  // Router.push('/home')
  // Router.push({
  //   path:'/home',
  //   state:1
  // })
  // 실제 패키지나 라이브러리를 디자인할 때 많이 사용하는 방식.
  type Config = {
    path: string;
    state: object;
  };
  type Push = {
    (path: string): void;
    (config: Config): void;
  };
  //? 왜 config type이 any로 나오지??
  const push: Push = (config) => {
    if (typeof config === 'string') {
      console.log(config);
    } else {
      console.log(config.path, config.state);
    }
  };
  //. call signatures와 파라미터 개수가 모두 다를 때
  type Add = {
    (a: number, b: number): number;
    (a: number, b: number, c: number): number; //. 마지막 파라미터인 c는 optional이 된다.
  };
  const add: Add = (a, b, c?: number) => {
    if (c) return a + b + c;
    return a + b;
  };
  add(1, 2);
  add(1, 2, 3);
}

//* Polymorphism : 다형성(여러 형태를 가지는 것)
{
  //- concrete type
  // type SuperPrint = {
  //   (arr: number[]): void;
  //   (arr: boolean[]): void;
  //   (arr: string[]): void;
  //   (arr: (number | boolean)[]): void;
  // };
  //! generic type : 일종의 type placeholder
  //. call signature를 작성하는 데 들어올 확실한 타입을 모를 때 사용
  type SuperPrint = {
    //. <T> : T라는 제네릭을 사용할 것이라고 타입스크립트에게 알려주는 것
    // <TypePlaceholder>(arr: TypePlaceholder[]): void;
    <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder;
  };
  const superPrint: SuperPrint = (arr) =>
    // {arr.forEach((i) => console.log(i))}
    arr[0];
  //. generic을 사용하면 typescript는 superPrint함수의 인자를 보고 타입을 유추하여 placeholder자리에 표시한다.
  const a = superPrint([1, 2, 3, 4]); //. typescript는 이 라인에서 superPrint함수는 number 타입 배열을 인자로 받는다는 것을 알게 된다.
  const b = superPrint([true, false, true]);
  const c = superPrint(['a', 'b', 'c']);
  const d = superPrint([1, 2, true, false, 'hello']);
}

//* Generics
{
  //! generic은 때마다 요구대로 call signature를 생성해주는 도구
  //. typescript는 generic의 첫 인식과 순서를 기반으로 generic의 타입을 알게 된다.
  //- generic 사용 1. 라이브러리나 패키지에서 많이 사용
  type SuperPrint = <T, M>(a: T[], b: M) => T;
  const superPrint: SuperPrint = (a) => a[0];
  const a = superPrint([1, 2, 3, 4], 'x');
  const b = superPrint([true, false, true], 1);
  const c = superPrint(['a', 'b', 'c'], false);
  const d = superPrint([1, 2, true, false, 'hello'], []);

  //- generic 사용 2. 함수에 직접 작성
  function superPrint2<T>(a: T[]) {
    return a[0];
  }
  const aa = superPrint2<number>([1, 2, 3, 4]); // 이렇게 generic의 type을 명시해줄 수도 있지만 typescript가 알아서 유추하도록 하는 것이 제일 좋다.
  const bb = superPrint2([true, false, true]);
  const cc = superPrint2(['a', 'b', 'c']);
  const dd = superPrint2([1, 2, true, false, 'hello']);

  //- generic 사용 3. 많은 것들이 있는 큰 타입을 하나 가지고 있는데, 그 중 하나가 정해지지 않은 타입일 때
  type Player<E> = {
    name: string;
    extraInfo: E;
  };
  type ChanExtra = {
    favFood: string;
  };
  type ChanPlayer = Player<ChanExtra>;
  const chan: ChanPlayer = {
    name: 'chan',
    extraInfo: {
      favFood: 'Tuna',
    },
  };
  const mom: Player<null> = {
    name: 'mom',
    extraInfo: null,
  };

  //- generic 사용 4.
  type A = Array<number>;
  let aaa: A = [1, 2, 3, 4];
  function printAllNumbers(arr: Array<number>) {}
  // useState<number>() //. react.js 이렇게 generic을 보내면 call signature가 number타입인 useState가 된다.
}

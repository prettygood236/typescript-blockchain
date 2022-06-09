//* d.ts : ts에게 type을 정의해주는 파일. (Declaration)
//. js패키지나 라이브러리를 사용할 때 작성해야할 수 있다.

interface Config {
  url: string;
}

declare module 'myPackage' {
  function init(config: Config): boolean;
  function exit(code: number): number;
}

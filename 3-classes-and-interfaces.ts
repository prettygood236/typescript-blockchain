//* Classes #1
{
  class Player {
    // 이 ts코드를 js로 컴파일하면 다음과 같다.
    constructor(
      // constructor(firstName, lastName, nickname)
      private firstName: string, // this.firstName = firstName;
      private lastName: string, // this.lastName = lastName;
      public nickname: string // this.nickname = nickname;
    ) {}
    // method 접근가능자 default는 public이다.
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  const chan = new Player('chan', 'park', '바벼차');
  chan.nickname;

  //- abstract class : 상속받는 자식 class가 가져야할 property와 method를 명시해주는 class
  //. 오직 다른 class로 상속할 수만 있다. (instance를 만들 수 없다.)
  abstract class User {
    constructor(
      //- 접근제어자 : private, public, protected
      private firstName: string, //- private : 해당 클래스 안에서만 해당 property에 접근 가능
      protected lastName: string, //- protected :  외부로부턴 보호받지만 자식클래스에서도 해당 property에 접근 가능
      public nickname: string //- public : 자식클래스 뿐아니라 외부에서도 해당 property에 접근 가능
    ) {}
    //- abstract method : 상속받는 자식클래스가 구현하여 가져야할  method
    //. abstract class안에선 단지 call signature만 적고 구현은 자식클래스에서 해야한다.
    abstract getNickName(): void; // getNickName함수의 call signature
  }
  class Player2 extends User {
    // 이렇게 추상 클래스를 상속받는 자식클래스에서 추상 메소드를 구현해 주어야 한다.
    getNickName() {
      // console.log(this.nickname);
    }
  }
  // const chann = new User('chan', 'park', '바벼차'); //. Cannot create an instance of an abstract class.
  const chan2 = new Player2('chan', 'park', '바벼차');
  // chan2.firstName; //. Property 'firstName' is private and only accessible within class 'Player'.
  // chan2.lastName; //. Property 'lastName' is protected and only accessible within class 'User' and its subclasses.
  chan2.nickname; //. public이기 때문에 접근 가능.
  chan2.getNickName();
}

//* Classes #2
{
  type Words = {
    [keyy: string]: string; //. Words type은 제한된 양의 string type property만을 가지는 object가 된다.
  };
  // let dic: Words = {
  //   potate: 'food',
  //   house: 'expensive',
  // };
  class Dict {
    private words: Words;
    //. Property 'words' has no initializer and is not definitely assigned in the constructor.
    //. 따라서 property를 만들고 아래와같이 초기화가 필요하다.
    constructor() {
      this.words = {};
    }
    // class를 type처럼 사용할 수도 있다.
    add(word: Word) {
      if (this.words[word.term] === undefined) {
        this.words[word.term] = word.def;
      }
    }
    remove(word: Word) {
      delete this.words[word.term];
    }
    update(word: Word, def: string) {
      this.words[word.term] = def;
    }
    def(term: string) {
      console.log(this.words[term]);
    }
    //- static : class의 instance 없이 호출이 가능. (const dict = new Dict() 생략가능)
    static hello() {
      return 'hello';
    }
  }
  class Word {
    constructor(public readonly term: string, public readonly def: string) {}
  }
  const kimchi = new Word('kimchi', '한국의 음식');
  // console.log(kimchi);
  const dict = new Dict();
  dict.add(kimchi);
  // dict.def('kimchi');
  dict.remove(kimchi);
  // console.log(dict);
  dict.update(kimchi, 'With 라면 = 죽음');
  // dict.def('kimchi');
}

//* Type
{
  //- 1. Type을 명시.
  type Food = string;
  const kimchi: Food = 'delicious';

  type Nickname = string; //. alias 사용 가능
  type HealthBar = number;
  type Friends = Array<string>;

  //- 2. 특정 값만 가지도록 제한.
  type Team = 'red' | 'blue' | 'yellow';

  //- 3. object의 모양을 명시.
  type Player = {
    nickname: Nickname;
    healthBar: HealthBar;
    friends: Friends;
    team: Team;
  };
  const chan: Player = {
    nickname: 'chan',
    healthBar: 10,
    friends: ['dumbbell', 'barbell', 'kettlebell'],
    team: 'red',
  };
}

//* Interfaces #1
//! Interface : object의 모양을 명시
//. type은 기능이 다양하지만 interface는 오로지 typescript에게 object의 모양을 설명하는 기능만을 담당한다.
{
  type Team = 'red' | 'blue' | 'yellow';
  type Health = 1 | 5 | 10;
  interface Person {
    nickname: string;
    team: Team;
    health: Health;
  }
  //. object의 모양을 설명하는 type과 interface
  // type User = {name: string}
  interface User {
    name: string;
  }
  //- type Player = User & {} //. type 상속 방법
  interface Player extends User {}
  const chan: Player = {
    name: 'chan',
  };
  //. A type cannot be changed after being created
  //. Unlike types, interfaces can accumulate propterties
  interface User2 {
    name: string;
  }
  interface User2 {
    firstname: string;
  }
  interface User2 {
    health: number;
  }
  const chann: User2 = {
    name: 'chan',
    firstname: 'p',
    health: 100,
  };
}

//* Interfaces #2
{
  //! abstract class는 다른 class(상속받는 자식class)에게 표준화된 property와 method의 청사진을 제시한다.
  // abstract class User {
  //   constructor(protected firstName: string, protected lastName: string) {}
  //   abstract sayHi(name: string): string;
  //   abstract fullName(): string;
  // }
  // class Player extends User {
  //   fullName() {
  //     return `${this.firstName} ${this.lastName}`;
  //   }
  //   sayHi(name: string) {
  //     return `Hello ${name}. My name is ${this.fullName()}`;
  //   }
  // }

  //. abstract class대신 interface를 쓰면 더 가볍고 파일사이즈가 작아진다. (interface는 js로 컴파일하면 사라진다.)
  //. interface는 abstract class와 마찬가지로 class의 모양을 알려준다.
  interface User {
    firstName: string;
    lastName: string;
    sayHi(name: string): string;
    fullName(): string;
  }
  interface Human {
    health: number;
  }
  class Player implements User, Human {
    constructor(
      public firstName: string,
      public lastName: string,
      public health: number
    ) {}
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name: string) {
      return `Hello ${name}. My name is ${this.fullName()}`;
    }
  }
  //. class도 type으로 쓸 수 있고, interface도 type으로 쓸 수 있다.
  //. 여기서 interface는 argument와 return값의 모양을 지정해준다.
  function makeUser(user: User): User {
    return {
      firstName: 'chan',
      lastName: 'p',
      fullName: () => 'xx',
      sayHi: (name) => 'string',
    };
  }
  makeUser({
    firstName: 'chan',
    lastName: 'p',
    fullName: () => 'xx',
    sayHi: (name) => 'string',
  });
  //. type과 class 모두 abstract class를 대체할 수 있다.
  //! class나 object의 모양을 알려줄 땐 interface를 사용하고 나머지 모든 경우에는 type을 사용하라!
  type PlayerA = {
    firstName: string;
  };
  interface PlayerB {
    firstName: string;
  }
  class User implements PlayerA {
    constructor(public firstName: string) {}
  }
}

//* Polymorphism : How we can writes code that takes own different shapes
{
  //- Local Storage API implementation
  interface SStorage<T> {
    [key: string]: T;
  }
  //? generic을 class로 보내고 class에서 generic을 interface로 보내면 interface에서 사용할 수 있다.
  class LocalStorage<T> {
    private storage: SStorage<T> = {};
    set(key: string, value: T) {
      this.storage[key] = value;
    }
    remove(key: string) {
      delete this.storage[key];
    }
    get(key: string): T {
      return this.storage[key];
    }
    clear() {
      this.storage = {};
    }
  }
  const stringsStorage = new LocalStorage<string>();
  stringsStorage.set('hello', 'how are you');
  // console.log(stringsStorage);
  // console.log(stringsStorage.get('hello'));

  const booleansStorage = new LocalStorage<boolean>();
  booleansStorage.set('hello', true);
  // console.log(booleansStorage);
  // console.log(booleansStorage.get('hello'));
}

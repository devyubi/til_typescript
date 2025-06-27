# Class

- class는 `설계도` 이다.
- class 즉, 설계도를 기반으로 `객체(결과물)` 을 만드는 것
- 목적은 `인스턴스`. 즉, `new를 통해서 객체`를 만드는 것 (객체 대량 생산)
- class 는 문법으로 존재하며, 실무에서 직접 class 를 만드는 경우는 극히 드물다.
  ( 프론트엔드는 잘 쓰이지않지만, 백엔드에서는 무조건 쓴다. 엄청 중요함)

## 1. class 기본 모양

```js
class ClassName {
  // 코드 블럭
  // 지역 스코프
}
const 인스턴스 = new ClassName();

class Robot {
  // 코드 블럭
  // 지역 스코프
}
const ins = new Robot();
```

```ts
class ClassName {
  // 코드 블럭
  // 지역 스코프
}
const 인스턴스: ClassName = new ClassName();

class Robot {
  // 코드 블럭
  // 지역 스코프
}
const ins = new Robot();
```

## 2. class 에서 new 하면 실행되는 함수는 `약속`임.

- constructor 메소드 : 디폴트 생성자 메소드

```js,ts
class ClassName {
  // 작성하지 않아도 기본적으로 new 하면 작동됨.
  constructor() {}
}
const 인스턴스 = new ClassName();

class Robot {
  // 메소드축약형
  constructor() {
    console.log("안녕");
  }
}
const ins = new Robot();
```

- constructor 메소드 : 속성의 초기 값을 세팅해 줄 수 있음.

## 3. 객체의 속성값을 세팅한다.

- constructor 를 활용함.

```js
class Robot {
  // 메소드축약형
  constructor(who) {
    this.who = who;
    console.log(`${this.who} 안녕`);
  }
}
const ins1 = new Robot("여러분");
console.log(ins1); // Robot { who : '여러분' }
const ins2 = new Robot("팬 여러분");
console.log(ins2); // Robot { who : '팬 여러분' }
const ins3 = new Robot("주인님");
console.log(ins3); // Robot { who : '주인님' }
const ins4 = new Robot("친구야");
console.log(ins4); // Robot { who : '친구야' }
```

```ts
class Robot {
  // 여기는 클래스라서 내부 규칙이 있음.
  // 속성을 정의해 줘야함
  who: string;
  // 메소드축약형
  constructor(who: string) {
    this.who = who;
    console.log(`${this.who} 안녕`);
  }
}
const ins1 = new Robot("여러분");
console.log(ins1); // Robot { who : '여러분' }
const ins2 = new Robot("팬 여러분");
console.log(ins2); // Robot { who : '팬 여러분' }
const ins3 = new Robot("주인님");
console.log(ins3); // Robot { who : '주인님' }
const ins4 = new Robot("친구야");
console.log(ins4); // Robot { who : '친구야' }
```

## 4. 객체의 메소드 세팅

- 메소드는 객체의 기능을 말함. (객체에 만든 함수를 메소드라고 함.)

```js
class Robot {
  // 메소드축약형
  constructor(who) {
    this.who = who;
    console.log(`${this.who} 안녕`);
  }
  // 걷기 메소드
  walk() {
    console.log(`${this.who} 님과 같이 걸어요`);
  }
  // 말하기 메소드
  talk() {
    console.log(`${this.who} 님과 대화하고 싶어요`);
  }
}
const ins1 = new Robot("여러분");
console.log(ins1.who);
ins1.walk();
ins1.talk();
```

```ts
class Robot {
  // 속성 정의
  who: string;
  // 메소드축약형
  constructor(who: string) {
    this.who = who;
    console.log(`${this.who} 안녕`);
  }
  // 걷기 메소드
  walk(): void {
    console.log(`${this.who} 님과 같이 걸어요`);
  }
  // 말하기 메소드
  talk(): void {
    console.log(`${this.who} 님과 대화하고 싶어요`);
  }
}
const ins1: Robot = new Robot("여러분");
console.log(ins1.who);
ins1.walk();
ins1.talk();
```

## 5. 오로지 class 에만 있는 상속(extends)

- `유전자` 처럼 생각하면 편함. (혈액형, 피, 생김새 등)

```js
class Animal {
  constructor() {
    this.eye = 2;
  }
  cry() {}
  eat() {}
}
class Cat extends Animal {
  constructor() {
    //constructor 이거 안적어도 되는데 그냥 적음. (안적어도 실행 된다!!)
    super(); // 맨~~~위 애니멀의 컨스트럭터를 실행하라는 뜻
  }
  꾹꾹이() {}
}
class Dog extends Animal {
  constructor() {}
  멍멍() {}
}

new Cat();
```

```ts
class Animal {
  // 속성 정의
  eye: number;

  constructor() {
    this.eye = 2;
  }
  cry(): void {}
  eat(): void {}
}

class Cat extends Animal {
  꾹꾹이(): void {}
}

class Dog extends Animal {
  달짖기(): void {}
}

const ani: Animal = new Animal();
ani.cry();
ani.eat();
ani.eye;

const cat: Cat = new Cat();
cat.cry();
cat.eat();
cat.eye;
cat.꾹꾹이();

const dog: Dog = new Dog();
dog.cry();
dog.eat();
dog.eye;
dog.달짖기();
```

## 6. 상속에서 속성 값 전달하기

- 부모에게 값을 전달하기

```js
class Animal {
  constructor(_blood) {
    this.eye = 2;
    // 혈액을 받겠다.
    this.boold = _blood;
  }
  cry() {}
  eat() {}
}
const ani = new Animal("A형");

class Cat extends Animal {
  // extends 를 하셨으므로
  constructor(_blood) {
    // 엄마
    super(_blood);
  }

  꾹꾹이() {}
}

const cat = new Cat("B형");

class Dog extends Animal {
  constructor(_blood) {
    super(_blood);
  }

  달짖기() {}
}

const dog = new Dog("B형");
```

```ts
class Animal {
  // 속성정의
  eye: number;
  boold: string;

  constructor(_blood: string) {
    this.eye = 2;
    // 혈액을 받겠다.
    this.boold = _blood;
  }
  cry(): void {}
  eat(): void {}
}

const ani: Animal = new Animal("A형");

class Cat extends Animal {
  // extends 를 하셨으므로
  constructor(_blood: string) {
    // 엄마
    super(_blood);
  }

  꾹꾹이(): void {}
}

const cat: Cat = new Cat("B형");

class Dog extends Animal {
  constructor(_blood: string) {
    super(_blood);
  }

  달짖기(): void {}
}

const dog: Dog = new Dog("B형");
```

## 오로지 TypeScript 에만 존재하는 문법

- public 속성 접근 제어자 (누구나 접근 가능)
- private 속성 접근 제어자 (그 누구도 접근 불가)
- protected 속성 접근 제어자 (상속받은 대상 접근 가능)

```ts
class BankAccount {
  // user 앞에 아무것도 적지 않으면 자동으로 퍼블릭속성이 들어간다.
  // 정보를 숨기고 싶으면 앞자리에 [private]을 붙여야함.
  private user: string;
  private balance: number;
  constructor(user: string, balance: number) {
    this.user = user;
    this.balance = balance;
  }
  showBalace() {
    this.balance; // 내부에서는 접근 가능
  }
}

const iu: BankAccount = new BankAccount("아이유", 55478);

iu.user;
iu.balance; // 비공개 데이터라서 Error
```

```ts
class Animal {
  public eye: number;
  private nose: number;
  protected lips: number;
}
// 상속받음.
class Cat extends Animal {
  constructor() {
    super();
  }
  show() {
    this.eye; // public 이라서 마음대로 접근
    this.nose; // ERROR, private 이라서 아무도 접근 불가
    this.lips; // protected는 자식이라서 허용 가능
  }
}

// 인스턴스 객체 생성
const cat = new Cat();
cat.eye; // public 이라서 마음대로 접근
cat.nose; // ERROR, private 이라서 아무도 접근 불가
cat.lips; // ERROR, protected 라서 아무도 접근 불가
```

## class에서 new 없이 사용가능한 속성과 메소드

- `Math.PI, Math.round(), Math.floor() ...`
- `static` 을 붙이면 new 없이 사용가능

```js
class MathTool {
  static PI = 3.14;
  static multi(x, y) {
    return x * y;
  }
}
MathTool.PI;
MathTool.multi(5, 6);
```

```ts
class MathTool {
  static PI = 3.14;
  static multi(x: number, y: number) {
    return x * y;
  }
}
MathTool.PI;
MathTool.multi(5, 6);
```

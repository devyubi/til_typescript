# Class

- class는 `설계도` 이다.
- class 즉, 설계도를 기반으로 `객체(결과물)` 을 만드는 것
- 목적은 `인스턴스`. 즉, `new를 통해서 객체`를 만드는 것 (객체 대량 생산)
- class 는 문법으로 존재하며, 실무에서 직접 class 를 만드는 경우는 극히 드물다.
  ( 프론트엔드는 잘 쓰이지않지만, 백엔드에서는 무조건 쓴다. 엄청 중요함)

## 1. class 기본 모양

```js
class ClassName {}
const 인스턴스 = new 클래스명();

class Robot {}
const ins = new Robot();
```

## 2. class 에서 new 하면 실행되는 함수는 `약속`임.

- constructor 메소드 : 디폴트 생성자 메소드

```js
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

## 6. 상속에서 속성 값 전달하기

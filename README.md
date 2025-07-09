# interface 키워드

- 오로지 `객체` 만을 위한 타입 정의

## 1. 의미

- 객체 에 반드시 있어야 하는 속성을 정의함
- 개발자가 코드 진행중 실수를 방지해줌
- 가독성을 위한 문법

## 2. 작성법

- 무조건 객체 형태를 정의함
- 기본형 타입 정의는 못함

```ts
interface Person {
  name: string;
  age: number;
}
const ub: Person = {
  name: "문유비",
  age: 29,
};
```

## 3. interface 의 문법

### 3.1 선택적 속성 (Optional Property)

- `속성명?;종류`

```ts
interface Person {
  name: string;
  age: number;
  city?: string; // ? 는 선택적 속성 (있을수도 있고 없을수도있고)
}
const ub: Person = {
  name: "문유비",
  age: 29,
};
```

### 3.2 3.2 읽기 전용 속성 (Readonly)

- `readonly 속성명:종류`

```ts
interface Person {
  readonly name: string;
  age: number;
  city?: string; // ? 는 선택적 속성 (있을수도 있고 없을수도있고)
}
const ub: Person = {
  name: "문유비",
  age: 29,
};

ub.age = 30;
ub.name = "문유비"; // 읽기전용이라 오류남.
```

### 3.3 함수 타입 정의

```ts
const add: (x: number, y: number) => number = (x: number, y: number): number =>
  x + y;
const add2: (x: number, y: number) => number = (x, y) => x + y;
interface Add {
  // 키명
  (x: number, y: number): number;
}
const add3: (x: number, y: number) => number = (x, y) => x + y;
```

- 조금 더 간소화 할 수 있게 (가독성)

```ts
// 함수 타입을 인터페이스로 선언
interface Add {
  (x: number, y: number): number;
}

// 2. 인터페이스를 이용해서 함수 선언
const add: Add = (x, y) => x + y;
const add2: Add = (x, y) => x + y;
const add3: Add = (x, y) => x + y;
```

### 3.4 class 에서 활용

```ts
// class 로 만들어진 객체는 반드시 속성이 있어야함
// 약속을 지켜라! 를 정의 할 때 사용함
interface Person {
  name: string;
  hi(): string;
  cr?(): string;
}

class Student implements Person {
  name: string;
  // constructor  = new를 쓰면 자동으로 실행되어서 {}를 만듦
  // 자동 객체 생성자 함수로서 결과물을 instance 라고 함.
  constructor() {}
  hi() {
    return "안녕";
  }
  cr() {
    return "운다";
  }
}

const ub: Student = new Student();

class Teacher implements Person {
  name: string;
  hi() {
    return "수업합니다";
  }
}

class Singer implements Person {
  name: string;
  hi() {
    return "노래합니다";
  }
}
```

### 3.5 class 상속의 확장 (확장)

- 유명한 라이브러리 소스에서 자주 보여짐

```ts
interface Animal {
  name: string;
}
const ani: Animal = {
  name: "홍길동",
};

// extends = 확장하다
interface Dog extends Animal {
  bark(): void;
}
const dog: Dog = {
  name: "댕댕이",
  bark: () => console.log("멍멍"),
};

interface Cat extends Animal {
  cry(): void;
}
const cat: Cat = {
  name: "야옹이",
  cry: () => console.log("야옹"),
};

interface Person extends Animal {
  say(): void;
}

const iu: Person = {
  name: "아이유",
  say: () => console.log("안녕"),
};
```

# ts 심화 - Narrowing

- 타입을 점차적으로 구체화
- 타입 좁히기
- typeof 검사 덕분에 조건문 안에서 정확한 타입이 결정돼 → 이걸 narrowing이라고 부름
- 여러 가지 타입 중에서, 코드의 흐름이나 조건문 등을 통해 실제 사용 가능한 하나의 타입으로 좁혀지는 것

```ts
// number 이거나 string 일 수 있음.
let numString: number | string = "아이유";
// ts 는 이때, 자동으로 number를 제거하고 string으로 판단함
// 이것을 narrowing 이라고 함. 즉, 타입 좁히기라고 함

// let numString : string
numString;
// 위의 변수는 string 으로 판정이 되므로 아래 문장이 오류가 발생함.
numString.toFixed(2); // number 타입이 아니라서 오류 발생함.
```

## 타입 좁히기 8개 방안

### 1. Assingment Narrowing

- 유니온 타입에서 초기값을 세팅해서 할당함

```ts
// 초기값으로 string 을 할당함
let numString: number | string = "문유비";
numString; // string
```

### 2. typeof Narrowing

- `typeof 연산자`를 사용해서 타입을 좁혀줌

```ts
// 초기값으로 string 을 할당함
let numString: number | string = "문유비";
numString; // string

numString = Math.random() > 0.5 ? 500 : "문유비";
if (typeof numString === "string") {
  // string
  numString; // let numString: string
} else {
  // number
  numString; // let numString: number
}
```

### 3. Truthiness Narrowing

- null, 0, undefined, "", Nan, false = (falsy한 값=거짓같은 값)

```ts
let nullOrString: null | string[];
nullOrString = Math.random() > 0.5 ? null : ["아이유", "블랙핑크"];
// if 로 참인 것을 거르고 처리
if (nullOrString) {
  // 글자배열
  nullOrString; // let nullOrString: string[]
} else {
  // null 이다.
  nullOrString; // let nullOrString: null
}
```

### 4. Equality Narrowing

- 비교 연산자를 이용함

```ts
let numOrString: number | string = Math.random() > 0.5 ? 100 : "아이유";
let stringOrBoolean: string | boolean = Math.random() > 0.5 ? "블랙핑크" : true;

// js 에서는 불가능 하지만, ts 에서는 가능하다.
if (numOrString === stringOrBoolean) {
  // numOrString:string === stringOrBoolean:string
  numOrString; // let numOrString: string
  stringOrBoolean; // let stringOrBoolean: string
} else {
  numOrString; // let numOrString: string | number
  stringOrBoolean; // let stringOrBoolean: string | true
}
```

### 5. in Opertor Narrowing

- in 연산자를 이용하여 타입 좁히기
- 객체의 속성을 추출하는 용도
- 보통 많은 개발자가 `type` 이라는 속성을 많이 활용함

```ts
interface Human {
  name: string;
  age: number;
}
interface Dog {
  name: string;
  type: string;
}
let h: Human = { name: "아이유", age: 28 };
let d: Dog = { name: "뽀삐", type: "토이푸들" };

let result: Human | Dog = Math.random() > 0.5 ? h : d;
// in 연산자를 이용해서 타입을 구체화, 즉 타입 좁히기를 실행하자
// console.log("age" in result);
// console.log("name" in result);
// console.log("type" in result);
if ("type" in result) {
  result; // let result: Dog
} else {
  result; // let result: Human
}
```

### 6. instanceof Narrowing

- new 클래스명() 으로 만들어진 변수를 인스턴스 변수라고 함

```ts
let dateOrString: Date | string = Math.random() > 0.5 ? new Date() : "아이유";

// new 로 생성된 것만 가능
if (dateOrString instanceof Date) {
  dateOrString; // let dateOrString: Date
} else {
  dateOrString; // let dateOrString: String
}
```

### 7. Discriminated Narrowing (공통 속성)

- 차별된 유니온 Narrowing
- 유니온 타입에서 `특정 속성을 사용`해서 타입 좁히기
- 불완전하게 타입을 좁힌 경우

```ts
// 좋지 않은 코드이지만, 해결은 가능함
interface Animal {
  type: "dog" | "human";
  // 사람일 때만 사용할 수 있다.
  height?: number; // 키 : number
  // 강아지 일 때만 사용할 수 있음
  breed?: string; // 종류: string
}
let result: Animal =
  Math.random() > 0.5
    ? { type: "human", height: 180 }
    : { type: "dog", breed: "뽀삐" };

// 상당히 좋지 않게 코드 분기를 하였다. 개선이 필요함
if (result.type === "human") {
  result;
  result.height;
  result.breed;
} else {
  result;
  result.breed;
}
```

- 개선한 코드

```ts
  type: "human";
  height: number;
}
interface Dog {
  type: "dog";
  breed: string;
}

type Animal = Human | Dog;

let result: Animal =
  Math.random() > 0.5
    ? { type: "human", height: 180 }
    : { type: "dog", breed: "뽀삐" };

// 상당히 좋지 않게 코드 분기를 하였습니다.
// 개선이 필요합니다.
if (result.type === "human") {
  result; // let result: Human
  result.height;
} else {
  result; // let result: Dog
  result.breed;
}
```

### 8. Existential Narrowing

- 존재하는 값을 사용해서 타입 구체화함. (타입좁히기)
- Switch Case 문을 사용함

```ts
interface Human {
  type: "human";
  height: number;
}
interface Dog {
  type: "dog";
  breed: string;
}

interface Cat {
  type: "cat";
  koo: string;
}

type Animal = Human | Dog | Cat;

let result: Animal =
  Math.random() > 0.5
    ? { type: "human", height: 180 }
    : Math.random() > 0.5
    ? { type: "dog", breed: "뽀삐" }
    : { type: "cat", koo: "꾹꾹이" };

// 개발자가 만든 type 속성을 이용해서 처리
switch (result.type) {
  case "human":
    result; // let result: Human
    break;
  case "dog":
    result; //let result: Dog
    break;
  case "cat":
    result; //let result: Dog
    break;
}
```

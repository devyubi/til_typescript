# Reference 데이터 타입

- 기본 Primitive 데이터

  - number, string, null, undefined, symbol, boolean
  - any, unknown, never

- 기본형 데이터가 너무 많다면 묶어서 관리하자!
  - 이를 참조 타입. 즉, Reference 타입이라고 함.
  - Reference 타입을 객체 라고 한다.

## 1. 배열(Array)이 있음

### 1.1 배열이 필요한 경우

- (예)사용자 정보를 관리한다

```js
const user_1: string = "hong";
const user_2: string = "kim";
const user_3: string = "park";
```

- 사용자 정보가 너무 많을 경우, 관리(변수명 짓기) 등이 어려움.
- 문법적으로 원시데이터를 모아서 관리하는 방안이 제시가 되었음. (배열이라고 함)

```js
const userArr = ["hong", "kim", "park"]; //편의성 때문에 묶어서 관리
userArr[0]; //hong
userArr[1]; //kim
userArr[2]; //park
userArr.length;
```

```ts
// 배열 기호로 데이터 종류 표현하기
const userArr: string[] = ["hong", "kim", "park"];
const userAge: number[] = [1, 2, 3, 4];
const userInfo: (number | boolean | string)[] = ["kr", true, 53];

// Generic 으로 데이터 종류 표현하기
const userArrGeneric: Array<string> = ["hong", "kim", "park"];
const userAgeGeneric: Array<number> = [1, 2, 3, 4];
const userInfoGeneric: Array<number | boolean | string> = ["kr", true, 53];
```

- 중첩된 배열

```ts
// 배열 기호로 데이터 종류 표현하기
const doubleArr: number[][] = [
  [1, 2],
  [500, 300],
];

// Generic 으로 데이터 종류 표현하기
const doubleArrGeneric: Array<number[]> = [
  [1, 2],
  [500, 300],
];

const doubleArrGeneric2: Array<Array<number>> = [
  [1, 2],
  [500, 300],
];
```

### 1.2 TypeScript 에만 있는 `튜플(Tuple)`

- 튜플도 배열임
- 배열의 요소에 타입을 별도로 지정할 수 있음
- 배열의 길이를 고정 시킬 수 있음
- 배열의 요소를 제거 또는 추가할 수 없음

```ts
// 일반 배열
const ageArr: number[] = [1, 2, 3];

// 튜플 배열 (약속된 값을 지켜야함)
const numTuple: [number, number, number] = [1, 2, 3];
const strTuple: [string, string] = ["a", "b"];
const userTuple: [number, string, boolean] = [1, "a", false];
const memberTuple: [string, number][] = [
  ["kim", 1],
  ["park", 2],
];
```

## 2. 객체(Object)가 있음

- 원시데이터를 묶어서 관리함
- 데이터의 각 요소의 이름. 즉, 속성(Property)를 정해서 관리함
- 아래 문장을 `객체 literal(작성법)` 이라고 하며, 많이 중요함

```js
{
이름: 원시데이터,
이름: 원시데이터,
}
```

### 2.1 객체의 이해

- 여러명의 사용자 정보를 관리함

만약 배열로 관리 한다면 ?

```js
const userName = ["hong", "park", "kim"];
const userAge = [20, 30, 10];
```

만약 객체 리터럴 관리를 한다면 ?

```js
const hong = { name: "hong", age: 20 };
const park = { name: "park", age: 30 };
const kim = { name: "kim", age: 10 };
```

```ts
const hong: {
  name: string;
  age: number;
} = { name: "hong", age: 20 };

const park: {
  name: string;
  age: number;
} = { name: "park", age: 30 };

const kim: {
  name: string;
  age: number;
} = { name: "kim", age: 10 };
```

- 번외 (내가 만든 `객체 타입 정의`)

```ts
type Person = {
  name: string;
  age: number;
};

const hong: Person = { name: "hong", age: 20 };

const park: Person = { name: "park", age: 30 };

const kim: Person = { name: "kim", age: 10 };
```
- 번외 (내가 만든 데이터 `객체 인터페이스`)
```ts
interface Person = {
  name: string;
  age: number;
};
```
### 3. 객체와 배열 활용

```ts
type Good = { title: string; price: number; sale: boolean };

const goodArr: Good[] = [
  { title: "사과", price: 1000, sale: true },
  { title: "딸기", price: 5000, sale: false },
  { title: "메로나", price: 500, sale: true },
];
goodArr[0].title;

const goodArrGeneric: Array<Good> = [
  { title: "사과", price: 1000, sale: true },
  { title: "딸기", price: 5000, sale: false },
  { title: "메로나", price: 500, sale: true },
];
goodArrGeneric[0].title;
```

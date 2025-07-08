type 키워드

## 1. ## type 키워드를 왜 사용하는가 ?

- 길게 작성되는 타입을 `짧게 줄여서` 사용하기 위해

```ts
const user: { name: string; age: number; job: string } = {
  name: "아이유",
  age: 25,
  job: "가수",
};

// 상단 내용은 너무 길어서 type을 별도로 뽑아서 작성하기 위함. 하단 예시
type User = { name: string; age: number; job: string };
```

코드를 더 `간편하게 읽게` 하기 위해

```ts
type Subject = "국어" | "영어" | "수학";
const test: Subject = "수학";

type Score = number;
const aaa: Score = 95; // aaa라는 이름은 좋지 않다. (수업내용을 위해)
```

- `재활용` 하기 위해

```ts
type Student = {
  name: string;
  age: number;
  major: string;
};

const iu: Student = { name: "아이유", age: 28, major: "노래" };
const jomin: Student = { name: "지민", age: 30, major: "노래" };
```

- 실수를 방지 하기 위해

```ts
type Gender = "남자" | "여자";

// " " 안에 공란으로 두고, Ctrl+SpaceBar를 누르면 남자or여자만 나옴.
const g: Gender = "여자";

console.log(g);
```

## 2. type 키워드로 정의 하는 법

### 2. 1 `기본 타입` 을 type 으로 정의하기

```ts
// const name:string = "문유비" (기본타입)
type UserName = string;
const name: UserName = "문유비";

// const age: number = 29; (기본타입)
type UserAge = number;
const age: UserAge = 29;

// const isMember:boolean = true; (기본타입)
type IsMember = boolean;
const isMember: IsMember = true;
```

- 추후 진행시에는 type에 대한 정의를 먼저 고민해보기 (추천)

```ts
type UserName = string;
type UserAge = number;
type IsMember = boolean;

const name: UserName = "문유비";
const age: UserAge = 29;
const isMember: IsMember = true;
```

### 2.2 `객체` 는 type 으로 정의하기

- `{속성명 : 속성값, 속성명 : 속성값}` 처럼 여러개를 묶어 둔 형태 (객체리터럴)

```ts
type Student = {
  name: string;
  age: number;
  major: string;
};

const ub: Student = { age: 29, name: "유비", major: "student" };
```

### 2.3 type 은 확장 이 가능함 (기존 type 을 확장해서 또 다른 type 작성)

```ts
type Person = { name: string; age: number };
// 확장을 하지 않은 경우
type Developer = { name: string; age: number; job: string };
// 확장을 하는 경우
type Teacher = Person & { major: string };
const kim: Teacher = { age: 20, major: "과학", name: "kim" };
```

### 2.4 Union ( `|` ) 문법도 제공함 (유니온 문법 여러가지 중 하나)

```ts
type Select = "OK" | "NO" | "CANCEL";
let userSelect: Select = "OK";
userSelect = "CANCEL";
userSelect = "NO";
userSelect = "싫어요"; // 코딩 중 오류가 발생
// 유니온이라는 문법은 유니온 안에 포함되어있는 문법 만 사용하겠다는 의미
```

### 2.5 인터셉션 문법도 제공함

- `모두 만족해야 함`

```ts
type Animal = {
  eye: number;
};
type Cat = {
  mustash: boolean;
};
type MyPet = Animal & Cat;
const cat: MyPet = { eye: 2, mustash: true };
```

### 2.6 Optional Property (`?`)

- 선택적 옵션 속성

```ts
type Person = {
  name: string;
  age: number;
  // 하단은 선택적 옵션
  gender?: string;
};
const ub: Person = { name: "아이유", age: 28 };
```

### 2.7 Readonly

- 읽기 전용 (`Readonly`)

```ts
type Person = {
  name: string;
  age: number;
  // 하단은 선택적 옵션
  gender?: string;
  readonly job: string;
};
const ub: Person = { name: "아이유", age: 29, job: "학생" };

ub.age = 29; // 값 변경됨
ub.name = "문유비"; // 값 변경됨
ub.job = "연기자"; // 상단에서 읽기 전용 속성이라고 되어있으므로 오류 발생, 값 변경 불가.
```

### 2.8 type 안에 type

```ts
type Geo = { lng: number; lat: number };
type Address = {
  city: string;
  zipCode: string;
  // geo: {lng:number; lat:number};
  geo: Geo;
};

const user: Address = {
  city: "대구",
  zipCode: "053",
  geo: { lat: 20.2547, lng: 32.2547 },
};
```

### 2.9 인덱스 시그니처

- type 객체 정의에서 `속성명을 미리 지정하지 않기`
- 실시간으로 객체 타입 생성됨

```ts
// type ScoreType = {
//   과학: number;
//   수학: number;
//   영어: number;
// };

type ScoreType = {
  [subject: string]: number;
};

const score = {
  과학: 90,
  수학: 80,
  영어: 95,
};

const myScore: ScoreType = {
  국어: 93,
  미술: "수", // string 이므로 오류임.
};
```

### 2.10 객체 배열 타입 정의

```ts
type Person = {
  name: string;
  age: number;
};
const human: Person[] = [
  { name: "yubi", age: 29 },
  { name: "kim", age: 20 },
  { name: "hong", age: 24 },
  { name: "hong", age: 24, job: "학생" },
  // 오류로서 처리하고 싶을 경우,
  // 상단 human 옆에 :Person[] 을 넣어주면 오류코드가 뜸.
  // Person 안에는 name과 age 뿐이라서 오류뜸.
  // :Person이 없을 경우, 오류가 뜨지 않음.
];
```

### 2.11 함수 타입 정의

- 입력값, 리턴값 모두 타입을 정의 할 수 있음
- `type 타입명 : ( 매개변수 : 타입 ) => 리턴값 타입`

```ts
type Add = (a: number, b: number) => number;
```

- 기본형 : 매개변수 없고, 리턴도 없음

```ts
// 1 단계
const hello = () => {
  console.log("안녕");
};

// 2 단계
const hello2: () => void = () => {
  console.log("안녕");
};

// 3 단계
type SayHello = () => void;
const hello3: SayHello = () => {
  console.log("안녕");
};
```

- 매개 변수가 있는 경우

```ts
const hello = (msg: string) => {
  console.log(msg);
};

type SayHello = (msg: string) => void;
const hello2: SayHello = (msg: string) => {
  console.log(msg);
};
```

- 매개 변수도 있고, 리턴도 있는 경우

```ts
const hello = (msg: string, word: string): string => {
  return msg + word;
};

type SayHello = (msg: string, word: string) => string;
const hello2: SayHello = (msg: string, word: string): string => {
  return msg + word;
};

// 실제론 이렇게 씀
const hello3: SayHello = (msg, word) => {
  return msg + word;
};
```

- 선택적 매개 변수

```ts
const hello = (msg: string, word?: string): void => {};
type SayHello = (msg: string, word?: string) => void;
const hello3: SayHello = (msg, word) => {};
```

- 타입 객체에 함수 정의하기

```ts
type Calculator = {
  name: string;
  add: (a: number, b: number) => number;
  minus: (a: number, b: number) => number;
  multi: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
};
const calc: Calculator = {
  name: "계산기",
  add: (a, b) => a + b,
  minus: (a, b) => a - b,
  multi: (a, b) => a * b,
  divide: (a, b) => a / b,
};

calc.name; // 계산기
calc.add(5, 6); // 11
```

# ts-심화 함수정의하기

- ts 에서는 아래처럼 함수를 생성하지 않기
- 함수에서는 매개변수 name 에 대해 타입추론을 해주지 않음.
- 일반 변수는 타입 추론을 지원해줌.

```ts
// 매개변수 name 에 대해 타입추론을 개발자에게 양도함.
function showName(name) {
  console.log(name);
}
```

- ts 에서는 최소 매개변수에 대해서는 타입 직접 지정

```ts
function showName(name: string) {
  console.log(name);
}
```

- 반환값에 대해서는 VSCode가 타입추론을 해줌 (명시해주지 않고 보자)

## 함수의 옵셔널(?) 매개변수

- 옵셔널을 사용하면 매개변수가 필수 값이 아님
- 선택적으로 활용 가능
- 옵셔널을 활용하면 undefined 를 허용하겠다.

```ts
function showName(name: string, age?: number) {
  console.log(name);
  if (age) {
    console.log(age);
  }
}

const result = showName("문유비");
const result2 = showName("문소정", 20);
```

## 함수의 매개변수 기본값 (default Value)

- 사용자가 만약에 값을 넣지 않는다면 처리

```ts
function showName(name: string, country: string = "한국") {
  console.log(name);
  console.log(country);
}

const result = showName("문유비", "미국");
const result2 = showName("문소정");
const result3 = showName("문깜찍", "태국");
```

## 함수의 매개변수 나머지 처리 (…)

- 매개변수 갯수를 모를 때 활용 (라이브러리에 자주 보임)

```ts
// ... 을 사용하면 배열을 만들어줌.
function showMember(...args: string[]) {
  console.log(args);
}
showMember("a", "b", "c"); // ["a", "b", "c"]
showMember("a", "b", "c", "d"); // ["a", "b", "c", "d"]
showMember("a"); // ["a"]
```

```ts
// ...args 는 끝자리만 가능함. end:string 은 불가하다는 뜻.
function showMember(first: string, ...args: string[]) {
  console.log(first);
  console.log(args);
}
showMember("a", "b", "c"); // "a", ["b", "c"]
showMember("a", "b", "c", "d"); // a", ["b", "c", "d"]
showMember("a"); // "a", []
```

## 함수의 리턴타입에 대한 처리

```ts
function add(a: number, b: number) {
  return a + b;
}
```

- 아래의 경우 고민을 해야함

```ts
function randomResult() {
  return Math.random() > 0.5 ? "안녕" : 100;
}
let a: "안녕" | 100 = randomResult();
let b: "안녕" | 100 = randomResult();
```

## 함수의 리턴 타입이 void

- void 는 기본형 데이터가 아님
- 아무것도 리턴하는 값이 없음 (연산만하고 끝남)

```ts
function randomResult() {}
let a = randomResult();
let b = randomResult();
```

## 함수의 리턴 타입이 never

- 절대로 `리턴이 되면 안된다`를 표현
- 무한 루프, ERROR 가 발생한다면.
- 강제로 에러 발생 시켜봄

```ts
// 강제로 에러를 발생 시킨 코드 makeError
// 여기서 뒤에 :never 는 절대로 발생 되면 안된다 는 뜻
function makeError(): never {
  throw new Error("에러 처리");
}

makeError();
```

- 무한 루프 예제

```ts
function loop() {
  while (true) {}
}
loop();
```

# ts 심화 - 함수 시그니처를 타입으로 정의하기

- 아래 코드는 가독성이 복잡함

```ts
const sing: (arr: string[]) => string[] = (arr: string[]) => {
  return arr.map((item) => `${item} 입니다.`);
};
sing(["아이유", "지민"]);
```

- 위의 코드를 type 으로 추출함

```ts
type MapParam = (arr: string[]) => string[];

const sing: MapParam = (arr: string[]) => {
  return arr.map((item) => `${item} 입니다.`);
};

sing(["아이유", "지민"]);
```

- 매개 변수도 없고, 리턴도 없음

```ts
type SingType = () => void;

const sing: SingType = () => {};

sing();
```

- 매개 변수가 있고, 리턴은 없는 경우

```ts
type SingType = (user: string) => void;

const sing: SingType = (user: string) => {};

sing("아이유");
```

- 매개 변수도 있고, 리턴도 있는 경우

```ts
type SingType = (user: string) => string;

const sing: SingType = (user: string) => {
  return user;
};

sing("아이유");
```

- 위의 응용 예제

```ts
type SingType = (user: string) => string;

const sing: SingType = (user: string) => {
  return user;
};
const say: SingType = (name: string) => {
  return name + "안녕";
};
sing("아이유");
```

- interface 를 이용해서 정의하기

```ts
type SingType = (user: string) => string;

const sing: SingType = (user: string) => {
  return user;
};

// 위는 type , 아래는 interface

interface SingI {
  // 키명 : 키값
  (user: string): string;
}
const say: SingType = (name: string) => {
  return name + "안녕";
};
sing("아이유");
```

# ts 심화 - 함수 오버로딩

- 동일한 함수명
- 매개 변수 갯수 또는 데이터 종류가 다름

```ts
// 중복된 함수는 불가능하지만, 오버로딩 시 가능
// 매개 변수 한개
// 매개변수 세개
// 함수명은 동일하게
function showMember(a: string, b?: string, c?: string) {}

showMember("문유비");
showMember("문유비", "문소정", "문깜찍");
showMember("문유비", "문소정"); // 2 개가 가능하므로, 원하는 결과는 아님. (오류의 가능성 다분함)
```

- 함수 오버로딩 구현

```ts
// 매개변수 한개 (규칙 부분)
function showMember(a: string): void;
// 매개변수 세개
function showMember(a: string, b: string, c: string): void;

// 구현 부분
function showMember(a: string, b?: string, c?: string): void {
  console.log(a);
  if (b && c) {
    console.log(b, c);
  }
}

showMember("문유비");
showMember("문유비", "문소정", "문깜찍");
showMember("문유비", "문소정"); // 2개가 가능 하므로 ERROR 가 뜸. (이걸 함수 오버로딩이라고 함)
```

## ts 심화 - Type Predicate

- 어떤 변수, 어떤 반환값 특정 타입인지 확인하는 용도의 함수

```ts
// 어떤 재료가 들어왔을 때, number 인지 확인하는 함수 (Type Predicate)
function isNumber(a: any): a is number {
  return typeof a === "number";
}
const age = isNumber(30);

// 어떤 재료가 들어왔을 때 boolean 인지 확인하는 함수
function isBoolean(a: any): a is boolean {
  return typeof a === "boolean";
}
const hi = isBoolean("안녕");
```

```ts
// 어떤 재료가 들어왔을 때 number 인지 확인 하는 함수
function isNumber(a: any): a is number {
  return typeof a === "number";
}
const age = isNumber(30);

let test: any = 100;
if (isNumber(test)) {
  test; // let test: number
}

// 어떤 재료가 들어왔을 때 boolean 인지 확인 하는 함수
function isBoolean(a: any): a is boolean {
  return typeof a === "boolean";
}
const hi = isBoolean("안녕");

let check: any = false;
if (isBoolean(check)) {
  // boolean 이라면 정리하겠다.
  check; // let check: boolean
}

let count: any = "5번";
Math.round(count); // Math.round : 반올림 이라는 뜻

if (isNumber(count)) {
  // 정말 숫자다
  count;
} else {
  // 숫자가 아니다
  console.log("숫자를 입력하세요.");
}
```

- interface 활용

```ts
interface Dog {
  name: string;
  age: number;
}
interface Cat {
  name: string;
  breed: string;
}
type DogCat = Dog | Cat;
function isDog(a: DogCat) {
  // (a as Dog) : 얘는 무조건 강아지다. !== undefined : 무조건 값을 추출해내라
  return (a as Dog).age !== undefined;
}

const pp: DogCat = { name: "댕댕이", age: 10 };
const cc: DogCat = { name: "댕댕이", breed: "샴" };

if (isDog(pp)) {
  // Dog 라는 코드 진행
  pp; // const pp: Dog
} else {
  // Cat 이라는 코드 진행
}
```

## ts 심화 - 참고

- 타입 오류 발생 시 조치 사항
- 1. `any` 로 변경 해 보기
- 2. `Narrowing (타입좁히기)` (if 문 사용)
- 3. `as 로 강제 타입` 설정
- 4. `is 함수` 써보기
- = 1 → 2 → 3 → 4 번대로 순차적으로 실행

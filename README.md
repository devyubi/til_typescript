# ts 심화 - generic

- 나중에 타입을 결정함
- `타입 변수` 임
- any 타입에서 효과를 발휘함

## 1. 함수에서 제네릭 사용하기

- 매개변수의 종류가 무엇인지 모르겠다? 하면 any 를 많이 선호함

```ts
function whatValue(value: any) {
  return value;
}

const result = whatValue("안녕");
```

- any 타입은 `아무거나 다 된다` 라는 의미
- 리턴되는 값이 타입도 any 가 되어서 정확하지 않음
- 아래의 경우 문제가 됨

```ts
function whatValue(value: any) {
  return value;
}

const result = whatValue("안녕");
result.toUpperCase(); // 대문자로 바꾸기 - 문제없음

// 숫자라서 오류발생함
const resultNum = whatValue(123);
result.toUpperCase(); // Error: 대문자로 바꾸기 - 문제발생
```

- 위의 문제를 해결하기 위해 `Generic` 을 이용하여 해결함

```ts
function whatValue<T>(value: T): T {
  return value;
}

// const result: "abc"
const result = whatValue("abc");
result.toUpperCase(); // 대문자로 바꾸기, 문제없음

// 숫자라서 오류발생 (코딩 중 발견 가능)
// const resultNum: 123
const resultNum = whatValue(123);
resultNum.toUpperCase(); // Error: 대문자로 바꾸기, 문제발생
```

- VSCode 가 실시간으로 타입추론 잘 해줌

## 2. 함수에서 Generic을 여러개 사용하기

```ts
function multiFun<T, K>(a: T, b: K): { a: T; b: K } {
  return { a, b };
}
/**
 * {
    a: string;
    b: number;
    }
 */
const result = multiFun("ub", 29);
```

## 문제 풀이

- 숫자값을 받아 숫자로 돌려주는 제네릭 함수 만들기

```ts
function doubleNum<T>(a: T): T {
  return a;
}

const result = doubleNum(5);
```

- 숫자 값을 받아서 2배로 돌려주는 제네릭 함수만들기

문제 1.

```ts
function doubleNum(a) {
  return a * 2;
}

const result = doubleNum(5);
```

- 해결

```ts
function doubleNum<T extends number>(a: T): T {
  return (a * 2) as T;
}

const result = doubleNum(5);
```

## 3. interface에서 제네릭 활용하기

- 유연하게 데이터 타입을 정의하는 방법
- 데이터 모양을 약속하는 문법

```ts
interface Person {
  name: string;
  age: number;
}

const me: Person = {
  name: "문유비",
  age: 29,
};
```

- generic 으로 전달함

```ts
interface Person<T> {
  name: T;
  age: number;
}

const me: Person<string> = {
  name: "문유비",
  age: 29,
};
```

- 그 외 예제

```ts
interface DateCache<T> {
  data: T[];
  lastUpdate: Date;
}

const d: DateCache<string> = {
  data: ["할일", "내일할일"],
  lastUpdate: new Date(),
};

const p: DateCache<number> = {
  data: [1, 2, 3],
  lastUpdate: new Date(),
};
```

## 4. 모든 Generic 의 기본 종류 지정해주기

```ts
interface DateCache<T = string> {
  data: T[];
  lastUpdate: Date;
}

// 아래는 기본형으로 string
const d: DateCache = {
  data: ["할일", "내일할일"],
  lastUpdate: new Date(),
};

// 아래는 기본형 말고 number 로 변경
const p: DateCache<number> = {
  data: [1, 2, 3],
  lastUpdate: new Date(),
};
```

## 5. Type 키워드에서 Generic 활용하기

- 간단하지만 응용은 많이 됨

```ts
type MyType<T> = T;

const m: MyType<string> = "안녕";
const a: MyType<number> = 28;
```

## 6. class 에서 generic 활용하기

```ts
class NumberPagination {
  // 필수 속성
  data: number[] = [];
  message?: string;
  lastFetchAt?: Date;
}

const a = new NumberPagination();
```

- 제네릭 적용

```ts
// T라고 써도되고, type에 이름을 붙여줘도됨 : Message
class NumberPagination<T, Message> {
  // 필수 속성
  data: T[] = [];
  message?: Message;
  lastFetchAt?: Date;
}

const a = new NumberPagination();
```

```ts
class NumberPagination<T, Message> {
  // 필수 속성
  data: T[] = [];
  message?: Message;
  lastFetchAt?: Date;
}

const a = new NumberPagination<string, number>();
```

## 7. 생성자 함수에서 generic 활용하기

```ts
class NumberPagination<T, K> {
  // 필수 속성
  data: T[] = [];
  message?: K;
  lastFetchAt?: Date;
  // new 하면 실행 될 생성자 함수
  constructor(data: T[], message?: K, lastFetchAt?: Date) {
    this.data = data;
    this.message = message;
    this.lastFetchAt = lastFetchAt;
  }
}

const a = new NumberPagination<string, number>(["문유비", "문소정"], 2025);
```

## 8. 상속에서 Generic 활용하기

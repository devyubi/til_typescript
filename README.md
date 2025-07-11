# Generic

- `타입을 나중에 결정한다.`
- Generic 을 `타입 변수` 라고 정리하자 (변수는 변수인데, 타입을 바꾸는 변수)
- 일반적인 변수는 값이 바뀌지만, Generic 은 값이 아니고 `변수의 종류` 를 변경함

## 1. 문제 상황 살펴보기

- 매개 변수의 `종류만 다르고` 기능은 같음
- 아래 코드를 자주 보게 됨

```ts
function showNumber(a: number): void {
  console.log(a);
}

showNumber(100);
function showString(a: string): void {
  console.log(a);
}

showString("Hi");

function showArg(a: any): void {
  console.log(a);
}

showArg(0);
showArg("Hi");
```

- 매개변수의 종류를 `any` 로 하면 되겠다는 생각을 함
- 두 함수를 하나로 정리하는 것이 좋겠다는 생각을 함

```ts
function showArg(a: any): void {
  console.log(a);
}

showArg(0);
showArg("Hi");
```

- 위처럼 any 로 작업을 했더니 추가적인 기능이 필요하게 되었음
- `any` 는 서비스 실행 중 오류 발생함
- `any` 는 코딩 중엔 확인 어려움. (예측 불가)

## 2. 문제 상황을 Generic 으로 해결해 보기

```ts
// T 를 무엇으로 생각하면 좋냐면 타입 변수라고 생각하면 좋음
function showArgGeneric<T>(a: T): void {
  console.log(a);
}

showArgGeneric(100); // 숫자
showArgGeneric("Hello"); // 문자열
showArgGeneric(true); // boolean
```

- 아래의 코드는 아직도 오류로 처리됨.
- 실행중 오류가 아니고, 코딩 중 오류를 표현함

```ts
// T 를 무엇으로 생각하시면 좋으냐면 타입변수
function showArgGeneric<T>(a: T): void {
  console.log(a);

  // 아래의 문제는 타입 좁히기로 해결이 가능하다.
  // 타입 가드 라고 합니다.
  console.log(a.length);
}

showArgGeneric(0);
showArgGeneric("안녕");
```

- 우선 해결코드를 진행하고, 다시 문법 보자.

```ts
function showArgGeneric<T>(a: T): void {
  console.log(a);
  // console.log(a.length); // 아래에서 if 로 오류 처리 진행

  // 타입 좁히기
  if ((a as any).length !== undefined) {
    console.log((a as any).length);
  } else {
    console.log("length 속성이 없습니다.");
  }
}

showArgGeneric(0);
showArgGeneric("안녕");
```

## 3. 다양한 예제

- 예제 1)
- 아래 코드는 해결은 되는데, 가독성은 매우 떨어짐

```ts
// 배열의 요소를 출력하는 함수
// 배열의 요소의 타입을 Generic 으로 구현

function showItems(
  arr: (
    | string
    | number
    | boolean
    | { age: number }
    | { age: number; name: string }
  )[]
) {
  arr.forEach((item, index) => {
    console.log(`${index} 번째 item은 ${item}`);
  });
}
showItems(["a", "b", "c"]);
showItems(["1", "2", "3"]);
showItems([true, true, false, false]);
showItems([{ age: 1 }, { age: 2 }, { age: 3 }]);
showItems([
  { age: 1, name: "hong" },
  { age: 2, name: "kim" },
  { age: 3, name: "park" },
]);
```

- 위의 코드에서 Generic 을 쓰니, 코드 가독성이 좋아졌다.

```ts
// 배열의 요소를 출력하는 함수
// 배열의 요소의 타입을 Generic 으로 구현

function showItems<T>(arr: T[]) {
  arr.forEach((item, index) => {
    console.log(`${index} 번째 item은 ${item}`);
  });
}
showItems(["a", "b", "c"]);
showItems(["1", "2", "3"]);
showItems([true, true, false, false]);
showItems([{ age: 1 }, { age: 2 }, { age: 3 }]);
showItems([
  { age: 1, name: "hong" },
  { age: 2, name: "kim" },
  { age: 3, name: "park" },
]);
```

- 예제 2) 복사를 하는 함수

```ts
// 복사를 하는 함수
function copyValue(a: number | string | boolean | (number | string)[]) {
  return a;
}
const result_1 = copyValue(1);
const result_2 = copyValue("hello");
const result_3 = copyValue(false);
const result_4 = copyValue([1, 2, 3]);
const result_5 = copyValue(["a", "b", "c"]);
```

- Generic 활용

```ts
// 복사를 하는 함수
function copyValue<T>(a: T) {
  return a;
}
const result_1 = copyValue(1);
const result_2 = copyValue("hello");
const result_3 = copyValue(false);
const result_4 = copyValue([1, 2, 3]);
const result_5 = copyValue(["a", "b", "c"]);
```

- 예제 3) 입력 값 반환

```ts
// 입력값 반환하기
function returnSame(input: any): any {
  return input;
}
const result_1: any = returnSame(1);
const result_2: any = returnSame("안녕");
const result_3: any = returnSame([1, 2, 3]);
```

- Generic 으로 바꿈

```ts
// 입력값 반환하기
function returnSame<T>(input: T): T {
  return input;
}
const result_1: 1 = returnSame(1);
const result_2: "안녕" = returnSame("안녕");
const result_3: number[] = returnSame([1, 2, 3]);
```

## 함수에서 활용되는 Generic 살펴보기

```ts
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// let이든 const든 값은 나옴
let result_1 = getFirst([1, 2, 3]);
let result_2 = getFirst(["a", "b", "c"]);
let result_3 = getFirst([1, "b", "c"]);
```

- reverse

```ts
// reverse 란 역순으로 돌려준다 는 의미.
// reverse 를 쓰면 무조건 리턴타입은 T [] 를 써줘야함
function reverseArr<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

// let이든 const든 값은 나옴
let result_1 = reverseArr([1, 2, 3]);
let result_2 = reverseArr(["a", "b", "c"]);
let result_3 = reverseArr([1, "b", "c"]);
```

- dd

```ts
function mergeArr<T>(arr1: T[], arr2: T[]): T[] {
  return [...arr1, ...arr2];
}

let result_1 = mergeArr([1, 2, 3], [6, 7, 3]);
```

```ts
function mergeArr<T, U>(arr1: T[], arr2: U[]): (T | U)[] {
  return [...arr1, ...arr2];
}

let result_1 = mergeArr([1, 2, 3], [6, 7, 3]);
let result_2 = mergeArr([1, 2, 3], ["a", "b", "c"]);
```

- 함수의 데이터 종류의 변경이 진행된 과정

```ts
// 배열의 특정 요소를 인덱스를 가져오기
// 배열은 length 라는 속성이 있다. (길이, 요소 개수)
// 배열은 요소의 순서(index) 가 있습니다.(0 시작)

function getItemIndex(
  배열: (number | string | boolean)[],
  인덱스: number
): number | string | boolean {
  return 배열[인덱스];
}
// 규칙 반드시 숫자 배열이여야 한다. (배열종류 제한이 걸림)
const result = getItemIndex([4, 7, 9], 2);
const result2 = getItemIndex(["안녕", "hi", "hello"], 2);
const result3 = getItemIndex([true, false, true, true], 2);
```

- any 로 해결했다. (데이터를 체크를 포기함.)
- 혹시 지금은 에러가 없는데, 나중에 에러가 발생하지 않을까?

```ts
function getItemIndex(배열: any[], 인덱스: number): any {
  return 배열[인덱스];
}
// 규칙 반드시 숫자 배열이여야 한다. (배열종류 제한이 걸림)
const result: any = getItemIndex([4, 7, 9], 2);
const result2: any = getItemIndex(["안녕", "hi", "hello"], 2);
const result3: any = getItemIndex([true, false, true, true], 2);
```

- `제네릭을 사용`하면 코딩 중에 오류발견 쉽고, 서비스 중에도 대응수월함.

```ts
function getItemIndex<T>(배열: T[], 인덱스: number): T {
  return 배열[인덱스];
}
// 규칙 반드시 숫자 배열이여야 한다. (배열종류 제한이 걸림)
const result: number = getItemIndex([4, 7, 9], 2);
const result2: string = getItemIndex(["안녕", "hi", "hello"], 2);
const result3: boolean = getItemIndex([true, false, true, true], 2);
const result4: string | number | boolean = getItemIndex(
  [true, 1, "hi", null],
  2
);
```

- 기본적으로 진행한 함수

```ts
// 배열의 요소 중 값이 있는지 파악기능
function findeItem(배열: (string | number)[], 값: string | number): boolean {
  return 배열.includes(값);
}
const result = findeItem(["수영", "공부", "요리"], "운동");
const result2 = findeItem([12, 20, 33], 20);
```

- any 로 해결해 봄.

```ts
function findeItem(배열: any[], 값: any): boolean {
  return 배열.includes(값);
}
const result = findeItem(["수영", "공부", "요리"], "운동");
const result2 = findeItem([12, 20, 33], 20);
```

- Generic으로 해결해 봄

```ts
// 배열의 요소 중 값이 있는지 파악기능
function findeItem<T>(배열: T[], 값: T): boolean {
  return 배열.includes(값);
}
const result: boolean = findeItem(["수영", "공부", "요리"], "운동");
const result2: boolean = findeItem([12, 20, 33], 20);
const result3: boolean = findeItem([12, "hello", false], 20);
```

## 인터페이스에서 제네릭 살펴보기

- 인터페이스는 데이터 모양이 `객체` 임
- 인터페이스는`객체 만` 을 위한 문법임

```ts
// 백엔드와 비동기 통신을 하는 중의 과정을 위한 객체 설계
interface ApiResponse {
  success: boolean;
  data: string | string[];
}
const loginApi: ApiResponse = {
  success: true,
  data: "ok",
};

const todoApi: ApiResponse = {
  success: true,
  data: ["공부", "운동", "휴식"],
};
```

- 앞으로 또 바뀔 소지가 있음을 앎
- any로 해결해 봄

```ts
// 백엔드와 비동기 통신을 하는 중의 과정을 위한 객체 설계
interface ApiResponse {
  success: any;
  data: any | any[];
}
const loginApi: ApiResponse = {
  success: false,
  data: "ok",
};

const todoApi: ApiResponse = {
  success: 0,
  data: ["공부", "운동", "휴식"],
};
```

- Generic 으로 해결해 봄 (코딩 중 오류, 실행중 오류 파악 용이)

```ts
// 백엔드와 비동기 통신을 하는 중의 과정을 위한 객체 설계
interface ApiResponse<T> {
  success: boolean;
  data: T | T[];
}
const loginApi: ApiResponse<string> = {
  success: true,
  data: "ok",
};

const todoApi: ApiResponse<string> = {
  success: false,
  data: ["공부", "운동", "휴식"],
};
```

- 인터페이스에서 `여러 개의 제네릭` 활용하기

```ts
// 백엔드와 비동기 통신을 하는 중의 과정을 위한 객체 설계
interface ApiResponse<T, U, V> {
  success: T;
  data: U | V[];
}
const loginApi: ApiResponse<boolean, string, string> = {
  success: true,
  data: "ok",
};

const todoApi: ApiResponse<number, string, string> = {
  success: 0,
  data: ["공부", "운동", "휴식"],
};
```

## 클래스에서 제네릭 살펴보기

- 일반적인 클래스 구성

```ts
// 저장하기 관련 클래스
class TodoStorage {
  // 내부에서만 사용할 변수
  private items: string[] = [];
  // 메서드 만으로. 즉, 검증된 과정으로만 내부 item으로만 배열 접근
  add(item: string): void {
    this.items.push(item);
  }
  read(): string[] {
    return this.items;
  }
}

// 결과
const result = new Storage(); // result 에는 인스턴스로서 { }가 저장됨
// result.items = ["아이유", "지민"]; // 접근 불가 (값 변경 불가)
// console.log(result.items); // 읽을 수도 없다.
result.add();
result.read();
```

- 다양한 데이터 종류를 위해서 any 변경

```ts
// 저장하기 관련 클래스
class TodoStorage {
  private items: any[] = [];
  add(item: any): void {
    this.items.push(item);
  }
  read(): any[] {
    return this.items;
  }
}

const result = new TodoStorage();
result.add("아이유");
result.read();
```

- Generic 활용

```ts
// 저장하기 관련 클래스
class TodoStorage<T> {
  private items: T[] = [];
  add(item: T): void {
    this.items.push(item);
  }
  read(): T[] {
    return this.items;
  }
}

const result = new TodoStorage();
result.add("아이유");
result.read();
```

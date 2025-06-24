# 범위 (Scope)

- 변수가 살아남는 범위
- 변수를 찾아서 사용할 수 있는 범위

## 1. Scope 종류

- `전역` 스코프 : 코드에서 어디에서든 접근 및 사용 가능 (var, let, const)
- `지역` 스코프 : `function` 또는 `{ }` 안쪽에서만 사용 가능
- `블록` 스코프 : `{ }` 블록 안에서만 사용 가능 (if, for 등에서 let, const)

## 2. 전역 스코프 (global scope) 간단예제

- 코드 어디서나 사용할 수 있는 범위

```js
let message = "안녕"; // 전역 스코프
function sayHello() {
  console.log(message);
}
sayHello();
```

```ts
let message: string = "안녕";
function sayHello(): void {
  console.log(message);
}
const sayHello = (): void => {
  console.log(message);
};
sayHello();
```

## 3. 지역 스코프 (local scope) 간단예제

```js
function sayHello() {
  let message = "안녕";
  console.log(message);
}
sayHello();
```

```ts
function sayHello(): void {
  let message: string = "안녕";
  console.log(message);
}
const sayHello = ():void {
    console.log(message)
}
sayHello();
```

## 4. 전역과 지역 스코프 간단예제

```js
let message = "안녕";
function sayHello() {
  let message = "hi~";
  console.log(message);
}
sayHello(); // hi~ 출력 (지역 스코프가 우선 순위임)
```

```ts
let message: string = "안녕";
function sayHello(): void {
  let message: string = "hi~";
  console.log(message);
}
sayHello(); // hi~ 출력 (지역 스코프가 우선 순위임)
```

## 5. 블록 스코프 간단예제

- var 가 스트레스를 준다.
- 옛날 코딩에는 var 를 사용했음. (문제가 많음)

```js
// 블록 스코프 예제
const age = 0;
{
  const age = 10;
  const subject = "공부";
}
console.log(age); // 0 이 출력 (const는 상수.)
console.log(subject); // 오류, Not defined ...
```

```ts
// 블록 스코프 예제
const age: number = 0;
{
  const age: number = 10;
  const subject: string = "공부";
}
console.log(age); // 0 이 출력 (const는 상수.)
console.log(subject); // 오류, Not defined ...
```

- var는 scope 가 규칙적이지 않고, 무조건 전역으로 생성 됨

```js
var age = 0;
{
  var age = 10;
  var subject = "공부";
}
console.log(age); // 10 이 출력 (const는 상수.)
console.log(subject); // 공부
```

```ts
var age: number = 0;
{
  var age: number = 10;
  var subject: string = "공부";
}
console.log(age); // 10 이 출력 (const는 상수.)
console.log(subject); // 공부
```

- var 는 `{ }` 블록 스코프는 없고, function 지역 스코프는 있음

```js
var age = 0;
function showAge() {
  var age = 100;
}

console.log(age);
showAge();
console.log(age); // 0 이 출력
```

```ts
var age: number = 0;
function showAge(): void {
  var age = 100;
}

console.log(age); // 0 출력
showAge();
console.log(age); // 0 이 출력
```

## 6. 전체 scope 정리

- let, const 는 `{ }` 에 따라 scope가 정리 됨

```js
let age = 0;
const job = "학생";
{
  let age = 100;
  let job = "개발자";
}
function showPerson() {
  let age = 400;
  let job = "요리사";
}
if (true) {
  let age = 800;
  let job = "직원";
}
```

- var 는 function 에 따라 스코프가 정리 됨

```js
var age = 0;
var job = "학생";
{
  var age = 100;
  var job = "개발자";
}
function showPerson() {
  var age = 400;
  var job = "요리사";
}
if (true) {
  var age = 800;
  var job = "직원";
}
```

## 7. Q & A

```js
if (true) {
  let age = 100;
}
console.log(age); // Error
```

```js
if (true) {
  var age = 100;
}
console.log(age); // 100
```

## Hoisting 의 이해 (변수에서)

- 만들지 않았는데 사용 가능 한 것 (좋지 않음)

```js
console.log(age); // Error
let age = 10;
```

```js
console.log(age); // Error
const age = 10;
```

```js
let age = 10;
console.log(age); // 10
```

## 2. hoisting 이 일어나는 경우

```js
console.log(age); // undefined
var age = 10;
console.log(age); // 10
```

# 변수의 재정의

## 1. 재정의가 불가능한 경우

```js
let age = 10;
let age = 100;

const job = "학생";
const job = "개발자";
```

## 1.2 가능한 경우

```js
let age = 10;
{
  let age = 100;
}

const job = "학생";
{
  const job = "개발자";
}
```

## 2. 막~ 재정의하는 경우

```js
var age = 10;
var age = 100;

var job = "학생";
var job = "개발자";
```

```js
var age = 10;
{
  var age = 100;
}

var job = "학생";
{
  var job = "개발자";
}
```

# 그렇다면 let, const, var 중에 무엇을 우선으로 할까 ?

## 1. 무조건 const 로 한다.

```js
const age = 0;
```

## 2. 코딩을 하다보니 값이 변경이 되어야 한다면 ?

- 진행중에 필요에 의해 let 으로 수정한다. (하다보니 바뀌어야 한다면 let)

```js
const age = 0;

age = 17;
```

# 함수에서의 scope

## 1. 중첩함수

- 데이터를 숨기고, 기능도 숨기고
- 안전한 코드가 구성됨

```js
function 외부() {
  const nickName = "문유비";
  // 중첩함수
  function 내부() {
    console.log(nickName);
  }
  내부();
}

console.log(nickName); // Error
내부(); // Error

외부();
```

```ts
function 외부(): void {
  const nickName: string = "문유비";
  // 중첩함수
  function 내부(): void {
    console.log(nickName);
  }
  내부();
}

console.log(nickName); // Error
내부(); // Error

외부();
```

## 2. 함수 외부 변수 접근 제한

- 데이터를 숨긴다. (password)
- 원하는 동작만으로 데이터를 확인 시킨다. (내부함수)

```js
function 외부() {
  // 비밀번호 박스를 만든 아자씨
  const pasword = "1234";
  function 내부() {
    // 그 박스를 여는 열쇠
    return password;
  }
  return 내부;
}

const 기능 = 외부();
const result = 기능();
password; // 오류
```

```ts
type ReturnType = () => string;
function 외부(): () => ReturnType {
  // string 을 리턴하는 함수라서 : () => string 을 붙여줌.
  // 리턴하는 함수는 void 붙이는거 아님.
  const pasword: string = "1234";
  function 내부(): string {
    return password;
  }
  return 내부;
}

const 기능 = 외부();
const result = 기능();
password; // 오류
```

## 3. 클로저 (closure)

- 함수는 실행하고 나면 함수 종료시 함수 내부의 변수는 제거됨
- 그런데 함수를 실행하고 함수 종료 후에도 내부 변수를 유지하는 것
- 일반적 함수는 데이터 유지를 못하고 사라짐

```js
// 클로저 아님
function showAge() {
  const age = 10;
  console.log(age);
}
showAge();
```

```ts
function showAge(): void {
  const age: number = 10;
  console.log(age);
}
showAge();
```

- 클로저로 변수값 유지하기

```js
function showAge() {
  let age = 10;

  return function () {
    age = age + 1;
    return age;
  };
}
const a = showAge();
a(); // 11
a(); // 12
```

```ts
type ReturnType = () => number;
function showAge(): ReturnType {
  let age = 10;

  return function (): number {
    age = age + 1;
    return age;
  };
}
const a: ReturnType = showAge();
a(); // 11
a(); // 12
```

- 클로저로 배열의 요소 관리하기

```js
function createList() {
  let itemArr = [];
  return {
    // add(재료) : 재료를 담으면 itemArr 에 추가한다.
    add(item) {
      itemArr.push(item);
    },
    // show() : 전체 itemArr 보여주기
    show() {
      return itemArr;
    },
  };
}
// itemArr;
// Error. Scope 위반

const myList = createList();
mylist.add("사과");
mylist.add("딸기");
mylist.show(); // ["사과", "딸기"]
```

```ts
type ReturnType = { add: (item: string) => void; show: () => string[] };
function createList(): ReturnType {
  let itemArr: string[] = [];

  return {
    add(item) {
      itemArr.push(item);
    },
    show() {
      return itemArr;
    },
  };
}

const myList: ReturnType = createList();
myList.add("사과");
myList.add("딸기");
myList.show();
```

- 클로저는 함수 안쪽의 데이터를 유지함. (함수가 종료되더라도 유지)

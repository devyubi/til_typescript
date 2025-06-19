# 연산

## 1. 사칙연산과 나머지 연산

- 덧셈 연산

```js
// + (덧셈) 연산
const a: number = 0;
const b: number = 5;
const c: number = a + b; //5

// str + str (글자 + 글자) 연산
const str_a: string = "hello";
const str_b: string = "!!!";
const str_c: string = str_a + str_b; // hello!!!

// str + num (글자 + 숫자) 연산
const str_a: string = "go";
const num_b: number = 5;
const result: string = str_a + num_b; // go5

// str + str (글자 + 글자) 연산
const str_a: string = "100";
const str_b: string = "999";
const result: string = str_a + str_b; // 100999

// 연산자 줄이기
let a: number = 0;
a = a + 1; // 결론은 a = 1
a += 1; // 결론은 2
a++; // 1 씩 증가 결론은 3
```

- 뺄셈 연산

```js
// - (뺄셈) 연산
const a: number = 0;
const b: number = 1;
const c: number = a - b; // -1

// str - str (글자 - 글자) 연산
const a: string = "안녕";
const b: string = "반가워";
const c: number = a - b; // 결론 NaN (숫자가 아니다! 라는 뜻)

// case 1 : str - num (글자 - 숫자) 연산
const a: string = "안녕"; // 숫자로 변경이 가능 하니 ? = no
const b: number = 5;
const c: number = a - b; // NaN

// case 2 : str - num (글자 - 숫자) 연산
const a: string = "100"; // 숫자로 변경이 가능 하니 ? = yes (100)
const b: number = 5;
const c: number = a - b; // 95

// 연산자 줄이기
let a: number = 0;
a = a - 1; // -1
a -= 1; // -2
a--; // -3
```

- 곱셈 연산

```js
// case 1 : str * str (글자 * 글자) 연산
const a: string = "100"; // 숫자로 변경이 가능 하니 ? = NO
const b: string = 5;
const c: string = a - b; // NaN

// case 2 : str * num (글자 * 숫자) 연산
const a: string = "100"; // 숫자로 변경이 가능 하니 ? = yes (100)
const b: number = 5;
const c: number = a - b; // 500

// 연산자 줄이기
let a: num;
```

- 나눗셈 연산

```js
// case 1 : num * num (숫자 * 숫자) 연산
const a: number = 0; //
const b: number = 1;
const c: number = a / b; // Infinity

// str * str (글자 * 글자) 연산
const a: string = "안녕"; //숫자로 변경이 가능하니 ? NO
const b: string = "반가워";
const c: number = a / b; // NaN

// case 1 : str / str (글자 / 숫자) 연산
const a: string = "안녕"; // 숫자로 변경이 가능하니 ? NO
const b: number = 5;
const c: number = a / b; // NaN

// case 2 : str / num (글자 / 숫자) 연산
const a: string = "100"; // 숫자로 변경이 가능하니 ? YES (100)
const b: number = 5;
const c: number = a / b; // 20

// 연산자 줄이기
let a: number = 5;
a = a / 1; // 5
a /= 1; // 5
```

- % 연산 (나머지 연산)

```ts
const a: number = 5;
const b: number = 2;
const c: number = a % b; // 1
// str * str (글자 * 글자) 연산
const a: string = "안녕"; // 숫자로 변경이 가능하니 ? NO
const b: string = "반가워";
const c: number = a % b; // NaN

// case 1 : 글자 / 숫자
const a: string = "안녕"; // 숫자로 변경이 가능하니 ? NO
const b: number = 5;
const c: number = a % b; // NaN

// case 2 : 글자 / 숫자
const a: string = "100"; // 숫자로 변경이 가능하니 ? YES (100)
const b: number = 5;
const c: number = a % b; // 0

// 연산자 줄이기
let a: number = 5;
a = a % 2; // 1
a %= 2; // 1
```

## 2. 논리 연산자

- true 냐 false 냐 판단하는 것
- falshy 한 판단
  - `false - null undefined "" NaN`

```ts
// OR 연산자 (또는 연산) : 하나만 true 이면 됨. (뒤에 것도 봄)
const result: boolean = true || true; // true
const result: boolean = false || true; // true
const result: boolean = false || false; // false

// AND 연산 (그리고 연산) : 둘 모두 true 이면 된다. (앞에 것 만 봄)
const result: boolean = true && true; // true
const result: boolean = false && true; // false
const result: boolean = false && false; // false

例 )
const isLogin:boolean = false; //로그인이 안됐다.
const result:string|boolean = isLogin || "<div>로그인하세요</div>"; //로그인 안됐으니까 로그인 해라

if(isLogin === true) {
  return "<div>로그인 하세요</div>"
}

例 )
const isLogin:boolean = true; //로그인이 되었을 경우
const result:string|boolean = isLogin && "<div>어서오세요</div>"; //로그인 되었으니까 다시 페이지 되돌아가기

if(isLogin === true) {
  return "<div>어서오세요</div>"
}

// Not 연산자 (! = not)
const a:boolean = !true; // false;
const a:boolean = !false; // true;

例 )
// 토글 버튼 만들기 (쓰임새가 많음)
let isLogin:boolean = false;
button.addEventListener("click", function(){
  let isLogin = !isLogin;
});
```

## 3. 비교 연산자 (결과는 true, false 가 나옴)

```ts
let result: boolean = 1 > 2; // 1이 2보다 크냐 ? NO (false)
let result: boolean = 1 < 2; // true

let result: boolean = 1 >= 2; // false
let result: boolean = 1 <= 2; // true

let result: boolean = 1 == 2; // false
let result: boolean = 1 != 2; // true

// 아래 연산자는 동치 연산자라고 해서 데이터 종류/ 데이터 값 모두 비교
let result: boolean = 1 == 2; // 1이 2와 같은가 ? NO false
let result: boolean = 1 === 2; // false
let result: boolean = 1 !== 2; // true

let result: boolean = 1 == "1"; // true
let result: boolean = 1 === "1"; // false
```

## 4. 3항 연산자 (if 문 줄여쓰기)

```ts
const str:string = 조건 ? 참일때 리턴 : 거짓일때 리턴;

const str:string = 1 > 2 ? "correct" : "wrong";
```

## 5. 병합 연산자 (최신 문법)

- 기본 값을 세팅 할 때 활용함
- null, undefined 가 아닌 것을 찾아서 세팅함

```ts
let userName: string; //현재 undefined
let displayName: string = userName ?? "Guest"; //Guest
// let userName: string; 이 안들어가 있는 경우 displatName 이 들어감.

let userName: string = "hong"; //현재 undefined, null 이 아님. (hong이다.)
let displayName: string = userName ?? "Guest"; // hong
```

## 6. 옵셔널체이닝 ( 최신 문법 - 기호 : `?.` )

- 객체가 존재하는가 ? 체크 요망

```ts
const userInfo = { age: 12, name: "hong", city: "Seoul" };
let age;
if (userInfo.age) {
  age = userInfo.age;
}
let name;
if (userInfo.name) {
  name = userInfo.name;
}
let city;
if (userInfo.city) {
  city = userInfo.city;
}

// 위와 같은 문법임.
// 그래서 위의 복잡한 코드를 쓰지 않고 좀 더 짧게 요약하여 아래 코드를 적용함.
const userInfo = { age: 12, name: "hong", city: "Seoul" };
const age = userInfo?.age;
const name = userInfo?.name;
const city = userInfo?.city;
```

## 7.typeof 연산자 ( 너의 데이터 종류는 뭐니 ? )

```ts
console.log(typeof 123); // number
console.log(typeof "hello"); // string
console.log(typeof true); // boolean

const age:number = 123;
console.log(typeof age); //number;

const age:number[] = [1,2,3];
console.log(typeof arr); //number[]; 실제로는 object 라고 출력됨

const obj: {age:number} = [age:10];
console.log(typeof obj); // {age:number}; 실제로는 object 라고 출력됨

type T = { age: number };
const obj: T = { age: 10 };
console.log(typeof obj); // T; 실제로는 object 라고 출력됨
```

- `기본형을 제외하고 참조형 데이터들은 직접 비교를 하는 방안을 찾아야 함`
 - 타입 좁히기 (Type Guard) 문법, 유틸리티 타입 사용 문법 等 의 학습 필요.


# Primitive 타입

- 기본적인 데이터 종류
- 변수명 : DataType = 값

## 1. number 타입

<!-- const : 고정된 값 -->
<!-- let :  변수 - 변할수있음 -->

```ts
const num_1 = 1;
const num_2: number = 2;
const num_3: number = 12.1;
const num_4: number = -100;
const num_5: number = Infinity;
const num_6: number = -Infinity;
const num_7: number = NaN;
```

const num_6: number = -Infinity;
(-Infinity : 마이너스값의 무한대)
const num_7: number = NaN;
(NaN : Not a Number)

## 2. string 타입

string : 글자

```ts
const str_1 = "안녕";
const str_2: string = "반가워";
let str_3: string = "김밥";
```

## 3. boolean 타입

- 프로그래밍에서 false 처럼 사용되는 값 (falshy 한 값)
- 아래의 경우는 falshy 하다고 판단하여 false 로 인정

```txt
false
""        비어있는 문자열은 if 문 等에 사용할 때 false 로 판단
0         숫자 0 은 if 문 等 에 사용할 때 false로 판단
null      if 문 等 에 사용 할 때 false 로 판단
undefined if 문 等 에 사용 할 때 false 로 판단
NaN       if 문 等 에 사용 할 때 false 로 판단
```

```ts
const boo_1 = false;
const boo_2: boolean = false;
let bool_3: boolean = false;
```

## 4. null 타입

- 프로그래머가 변수에 `값이 비었음`을 표현

```ts
const null_1 = null;
// null 은 null 이다 (말이 이상하긴 함. 하지만 얘도 데이터 값이다.....)
let null_2: null = null;
```

## 5. undefined 타입

- 프로그램이 초기값으로 세팅함.
- 값이 없다. 즉, 정의가 되어있지 않다.

```ts
let user: undefined = undefined;
```

## 6. 만약 강제로 null 을 넣는다면 ?

```ts
let count: number = null; //타입에러
```

- 그러나 , null 은 어디든 대입 가능해야 함.
  그래서 tsconfig.json에서

```json
{
  "include": ["src/**/*", "src/index.ts"],
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "outDir": "./dist",
    "strict": true,
    "moduleDetection": "force",
    "strictNullChecks": false // 여기서 허용함.
  }
}
```

## 7. 오로지 하나의 값만 보관하는 법

```ts
let a: 1 = 1;
let b: "안녕" = "안녕";
let c: true = true;
```

## 8. 절대 `중복되지 않은 유일무이한 값`

```ts
const sy = Symbol("age");
const syS: symbol = Symbol("name");
```

## 9. 기본형 데이터 종류 정리 (JavaScript 에도 존재함)

- 총 7가지가 존재함.

```ts
const strVar: string = "string";
const numVar: number = 0;
const boolVar: boolean = true;
const symVar: symbol = Symbol("age");
const nullVar: null = null;
const undeVar: undefined = undefined;
const bigIntVar: BigInt = BigInt(99999999); //7번 BingInt - 해당 데이터는 존재는 하지만 잘 쓰이진 않음.
```

## 10. 오로지 TypeScript 에만 존재하는 데이터타입 (초보자에게 어려운 내용) : anyVar

### 10.1 any 타입

- any 는 아무 값이나 대입할 수 있다.
  (치트키라고 생각해보자..)

- any 는 타입체크를 포기하겠다.
  (보통 급하게 체크 할때 쓰임. 다음날 와서 천천히 고치는 용도로 많이 쓰임.)

- any 는 과하게 사용 X. 적절하게 사용 권장

```ts
let anyVar: any = 100;
anyVar = "안녕";
anyVar = true;
anyVar = null;
anyVar = undefined;
anyVar = Symbol("age");
anyVar = BigInt(99999999);

// 타입스크립트는 실제 값의 종류를 따지는 것이 아니다.
// 데이터를 할당(대입)할때, 데이터 종류만 비교한다.
let testNum: number = anyVar;
```

- `any 타입은 어떤 다른 타입에도 값을 담을 수 있다.`
- `any 타입은 어떤 다른 타입에도 값을 할당 수 있다.`
- `any 타입은 어떤 다른 타입에도 값을 대입 수 있다.`

### 10.2 unknown 타입

- 데이터 종류를 모르겠다. (마치 any 처럼)
- 값으로 전달은 못한다. (any 와는 다르게)

```ts
let unknownVar: unknown = 100;
unknownVar = "안녕";
unknownVar = true;
unknownVar = null;
unknownVar = Symbol("age");
unknownVar = BigInt(99999999);

// 전달시 unknown 은 타입오류 발생
let testNum: number = unknownVar;
```

### 10.3 never 타입

- 어떤 것도 담을 수 없고, 어떤 곳에도 전달할 수도 없는 타입
- 절대로 결과가 나오지 않는 함수의 리턴 데이터 종류
- 마지막 결과로 에러를 던질 때

```ts
// 모두 에러임.
let neverVar1: never = 100;
let neverVar2: never = true;
let neverVar3: never = undefined;
let neverVar4: never = null;
```

# 응용 해보기

## 1. 회원가입을 필요로 한 항목명과 데이터를 정의해 보자.

- 필요로 한 항목을 우선 정리해 보자.
- 무엇을 보관하고 싶은지 고민해 보자.

### 1단계

- 각 사용자 정보의 데이터 종류 즉, 타입을 고민해보자

### 2단계

<!-- ( 사용자 정보를 보관하고 싶다 ) -->

```txt
1. 이름 : 글자

2. 주민번호 앞 여섯 자리 (생년월일) : 글자

3. 전화번호 : 글자

4. 주소 : 글자

5. 이메일 : 글자

6. 아이디 : 글자

7. 비밀번호 : 글자

8. 개인정보동의 : 참, 거짓
```

### 3단계

- 코딩으로 표현하기 (변수명 정하기)

```js
// - 각 사용자 정보의 데이터 종류 즉 타입을 고민해보자.

// 1. 이름 : 글자
//let name은 (자바스크립트)
let userName;

// 2. 주민번호 앞 여섯 자리 (생년월일) : 글자
let userBirth;

// 3. 전화번호 : 글자
let phoneNum;

// 4. 주소 : 글자
let address;

// 5. 이메일 : 글자
let email;

// 6. 아이디 : 글자
let userID;

// 7. 비밀번호 : 글자
let userPw;

// 8. 개인정보동의 : 참, 거짓
let policyCheck;
```

### 4단계

- 각 항목의 초기값 작성하기

```js
// 1. 이름 : 글자
let userName = "";

// 2. 주민번호 앞 여섯 자리 (생년월일) : 글자
let userBirth = "";

// 3. 전화번호 : 글자
let phoneNum = "";

// 4. 주소 : 글자
let address = "";

// 5. 이메일 : 글자
let email = "";

// 6. 아이디 : 글자
let userID = "";

// 7. 비밀번호 : 글자
let userPw = "";

// 8. 개인정보동의 : 참, 거짓
let policyCheck = false;
```

### 5단계

- 타입스크립트로 고려해보기

```ts
// 1. 이름 : 글자
let userName: string = "";

// 2. 주민번호 앞 여섯 자리 (생년월일) : 글자
let userBirth: string = "";

// 3. 전화번호 : 글자
let phoneNum: string = "";

// 4. 주소 : 글자
let address: string = "";

// 5. 이메일 : 글자
let email: string = "";

// 6. 아이디 : 글자
let userID: string = "";

// 7. 비밀번호 : 글자
let userPw: string = "";

// 8. 개인정보동의 : 참, 거짓
let policyCheck: boolean = false;
```

# 변수명 생성법 (명령법, 네이밍 규칙(코딩 컨벤션) 적용하기)

- 명사 그리고 영문 권장

```txt
1. 특수 기호 중 $ 와 _는 사용 가능.
2. 숫자로 시작할 수 없음.
3. 공백은 포함 못함.
4. 키워드는 사용 할 수 없음. (if, for, switch 등등 - 코딩하다보면 빨간 줄 생김.)
```

- 카멜(Camel Case) 명명법

```txt
1. 가장 많이 사용하는 방식으로 소문자로 시작.
2. 새 단어는 대문자
let userName;
```

- 스네이크(Snake Case) 명명법

```txt
1. 모두 소문자로 작성하며 단어마다 _ 기호가 붙음.
<<뱀처럼 기어다닌다고 생각하면 된다 _ _ _ >>
let user_name;
```

- 케밥(Kebap Case) 명명법

```txt
1. 모두 소문자로 작성
2. 단어 사이에 - 기호를 붙임
3. 케밥 케이스는 코딩에 사용 못함. (주로 css 클래스명으로 활용함.)
<<케밥은 줄로 이어서 - - - >>
let user-name;
```

- 파스칼(Pascal Case) 명명법 ※중요※

```txt
1. 대문자로 시작
2. 새로운 단어는 대문자로 시작
3. 의미가 다름. (관례상 개발자간의 암묵적 약속임)
- 대문자로 시작했네 객체가 아닐까?
- 객체를 만드는 객체생성자 함수 아냐?
- 객체를 생성하는 클래스 아냐?

let Person;
let Swiper;
let UserInfo;
```

- 상수(Const Case) 명명법

```txt
1. 전체가 대문자
2. 상수라고 해서 변하지 않는 값이라고 유추함

const PI = 3.142;
const APP_NAME = "TODO";
```

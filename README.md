# ts 심화 - 기본타입

- ts, vscode는 마이크로소프트에서 개발.
- 굳이 타입을 작성하지 않아도 괜찮다.
- VSCode 가 `타입 추론`을 잘해준다면 생략.

## 총 7가지의 기본타입

```ts
let strVar = "string";
let numVar = 1;
let bigVar = 1;
let boolVar = true;
let symbolVar = Symbol("symbol");
// 아래는 타입추론이 문법적으로 다르다
let nullVar: any = null; // 타입 추론 결과는 any
let null2Var: null = null; // 타입에 관여
// 아래는 타입추론이 문법적으로 다르다
let undefinedVar: any = undefined; // 타입추론 결과는 any
let undefined2Var: undefined = undefined; // 타입에 관여
```

- ts 에만 존재하는 기본형 타입

### 1. any

- 정말 자주 사용함. ( `타입이 중요하지 않을 때` )
- 사용은 하지만, 과도하게 사용은 절대 X .
- `치트키` 라고 생각하면 편하다
- any 타입은 어디에나 사용 가능
- any 타입은 어느곳에도 할당, 즉 대입이 가능함

```ts
let anyVar: any = 1450;
let strVar = anyVar;
let numVar = anyVar;
let bigVar = BigInt(anyVar);
let boolVar = anyVar;
let symbolVar = anyVar;
let nullVar = anyVar;
let undefinedVar = anyVar;
```

### 2. unknown

- any 와 용도가 비슷한 느낌
- any 처럼 어떤 것도 값을 담을 수 있음
- 다른 변수에 담기, 즉 할당은 못함
- 입력은 가능하지만, 할당하지는 못하는 특징을 갖고있음

```ts
let unknownVar: unknown;
unknownVar = 100;
unknownVar = "string";
unknownVar = true;

// 아래부터는 Error
let numVar: number = unknownVar;
// 'unknown' 형식은 'number' 형식에 할당할 수 없습니다.
```

### 3. never

- 어떤 타입도 `저장 또는 리턴 하지 않겠다` 는 의지 표현
- 절대로 발생하지 않을 것이라는 표현
- 예외 처리 혹은 무한 루프 처리에 활용함

```ts
// 아래는 모두 다 에러임
let neverVar: never = null;
let never2Var: never = undefined;
let never3Var: never = 1;
let never4Var: never = "string";
```

# TS 심화 - 목록 (배열) 타입

- 리스트 타입

```ts
// 타입 추론이 잘 정리 됨
let numberArr = [1, 2, 3];
let strArr = ["hong", "kim"];
let arr = [true, 4, "hong"];
```

```ts
// 제네릭으로 정리 ver
// 타입 추론이 잘 정리 됨
let numberArr: Array<number> = [1, 2, 3];
let strArr: Array<string> = ["hong", "kim"];
let arr: Array<boolean | number | string> = [true, 4, "hong"];
```

# TS 심화 - Type, Interface 타입

## 1. type 키워드로 정의하기

- 기본형 타입도 type 키워드로 별칭을 만들 수 있음

```ts
// 기본형 타입도 type 키워드로 별칭을 만들 수 있음
type HiType = string;
let hi: HiType = "hello"; // 여기서 hi 는 `나만의 타입` 임.

type AgeType = number;
let bbb: AgeType = 20; // bbb = 나만의 타입 (내가 알아볼 수 있게 만든 타입)
```

- `복잡한 객체 형태` 의 데이터도 type 키워드로 별칭을 만들 수 있음

```ts
type IdolType = {
  name: string;
  age: string;
  year: number;
};

let bts: IdolType = {
  name: "BTS",
  age: "20대",
  year: 2020,
};
```

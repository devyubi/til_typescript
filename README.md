# TS 심화 - Casting (캐스팅)

- VSCode 는 타입을 추론함.
- 특정한 타입으로 추론을 하라고 지시 할 수 있음.
- 강제로 타입을 변환 시킴
- `as` 문법
- any 안쓸 수는 없으니, 원하는 타입이 있으면 as 를 활용

```ts
let numVar: any = 5;

numVar = "Hello";
numVar = true;
numVar = 100;

// 강제로 데이터 타입을 지정하기 위한 처리
let temp = numVar as string;
temp.toUpperCase(); // 대문자로 바꾸어라
```

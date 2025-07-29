# ts 심화 - Utility Types

- type 을 편리하게 재정의 하기

## 1. Partial <Type>

- 가장 많이 사용함
- 모든 속성을 선택 속성으로 Optional

```ts
interface Idol {
  // 필수 속성으로 타입정의
  name: string;
  age: number;
  groupName: string;
}

// 모든 속성을 반드시 채워줌
const a: Idol = {
  age: 28,
  name: "유비",
  groupName: "유비팀",
};

// Idol 타입에서 일부분을 변경(업데이트) 하는 함수
function updateIdol(ori: Idol, update: Partial<Idol>) {
  return { ...ori, ...update };
}

// Partial 을 안쓸 경우 {age, name, groupName} 이 다 들어가야함
const b = updateIdol(a, { age: 29 });
```

- `Partial<Idol>`

```ts
interface Idol {
  // 필수 속성으로 타입정의
  name?: string;
  age?: number;
  groupName?: string;
}
```

## 2. Required<Type>

- 모든 속성을 필수 속성으로 변경

```ts
interface Idol {
  // 선택적 속성
  name?: string;
  age?: number;
  // 필수 속성으로 타입정의
  groupName: string;
}
const a: Required<Idol> = {
  groupName: "BTS",
  name: "지민",
  age: 20,
};
```

- `Required<Idol>`의 결과

```ts
interface Idol {
  // 필수 속성으로 타입정의로 변경
  name: string;
  age: number;
  groupName: string;
}
```

## 3. Readonly<Type>

- 모든 속성을 읽기전용으로 변경
- 객체의 값이 변경되지 않도록 함
- 최초 1번은 값 설정 가능

```ts
interface Idol {
  // 필수 속성으로 타입정의
  name: string;
  age: number;
  groupName: string;
}
const a: Readonly<Idol> = {
  groupName: "BTS",
  name: "지민",
  age: 20,
};
// 값 변경이 안되도록 설정 필요
a.groupName = "핑클"; // 에러
```

- `Readonly<Idol>`의 결과

```ts
interface Idol {
  // 필수 속성으로 타입정의
  readonly name: string;
  readonly age: number;
  readonly groupName: string;
}
```

## 4. Pick<Type, key>

- 특정 타입에서 원하는 속성만 골라서 새로운 타입으로 생성 (많이 활용 됨)
- `일부 속성만 사용하고 싶다`

```ts
interface Idol {
  // 필수 속성으로 타입정의
  name: string;
  age: number;
  groupName: string;
}
const a: Pick<Idol, "name" | "groupName"> = {
  groupName: "BTS",
  name: "지민",
};
```

- `Pick<Idol, "name" | "groupName">`의 결과

```ts
interface Idol {
  // 필수 속성으로 타입정의
  name: string;
  groupName: string;
}
```

## 5. Omit<Type, key>

- 특정 속성만 제외한 나머지 속성으로 이루어진 타입을 생성함

```ts
interface Idol {
  // 필수 속성으로 타입정의
  name: string;
  age: number;
  groupName: string;
}
const a: Omit<Idol, "age"> = {
  groupName: "BTS",
  name: "지민",
};
```

- `Omit<Idol, "age">`의 결과

```ts
interface Idol {
  // 필수 속성으로 타입정의
  name: string;
  groupName: string;
}
```

## 6. Exclude<UnionType, ExcludeMembers>

- `Union 타입`에서 `특정한 타입을 제외`한 나머지를 반환함

```ts
type NoString = Exclude<string | number | boolean, string>;
// type NoString = number | boolean 생성됨
```

## 7. Extract<UnionType, Members>

- `유니온 타입` 에서 `특정 속성만 뽑아서` 리턴

```ts
type NoString = Extract<string | number | boolean, string>;
// type NoString = string 생성됨
```

## 8. NonNullable<Type>

- `null` 과 `undefined` 를 제외한 타입 리턴

```ts
type NoString = NonNullable<string | number | boolean | undefined | null>;
// type NoString = string | number | boolean 생성됨
```

## 9. Parameters<Type>

- `함수의 타입`의 매게 변수 타입을 튜플 형태로 추출

```ts
function sayHi(age: number, name: string) {}
type Params = Parameters<typeof sayHi>;

// 튜플 : type Params = [age: number, name: string]
```

## 10. constructorParametars<typeof 클래스명>

- 클래스의 생성함수 constructor 의 매개변수 타입

```ts
class Idol {
  constructor(name: string, age: number) {}
}
type IdolParams = ConstructorParameters<typeof Idol>;
// type IdolParams = [name: string, age: number]
const a = new Idol("BTS", 20);
```

## 11. ReturnType<Type>

- 함수의 반환 타입을 추출함

```ts
type GetName = () => string;
type NameType = ReturnType<GetName>;

// type NameType = string
```

## 12. Template Literal Types

- 문자열 조작이 가능한 타입

```ts
type UB = "유비";
type Upper = Uppercase<UB>;
// type Upper = "유비"
type Lower = Lowercase<UB>;
// type Lower = "유비"
type Capital = Capitalize<UB>;
// type Capital = "유비"
type UnCapital = Uncapitalize<UB>;
// type UnCapital = "유비"
```

# ts 심화 - Key Value Mapping

- 객체의 키명과 값을 자동으로 맞춰주기 (Mapping)

## Sample Code

- 문제 상황 1

```ts
// BE 데이터 호출 관련한 타입 정의
// 오타 발생 소지 다분, 하나의 값을 변경하면 모두 찾아서 변경해야하는 불편이 있음
type GlobalApiStatus = {
  getUser: "Loading" | "Success" | "Error" | "Done";
  getPagenUM: "Loading" | "Success" | "Error" | "Done";
  getPust: "Loading" | "Success" | "Error" | "Done";
};
```

- 문제 상황 1번을 개선을 위해서 enum 을 씀

```ts
enum State {
  LOADING = "Loading",
  SUCCESS = "Success",
  ERROR = "Error",
  DONE = "Done",
}

type GlobalApiStatus = {
  getUser: State;
  getPageNum: State;
  getPost: State;
};
```

- 문제 상황 2번
- `값은 코드 개선으로 enum 을 사용`하여 효율성을 올려줌
- 하지만 `키명은 오타`를 내거나, 변경 시 적용 부분을 개선하지 못함

```ts
enum State {
  LOADING = "Loading",
  SUCCESS = "Success",
  ERROR = "Error",
  DONE = "Done",
}

type GlobalApiStatus = {
  getUser: State;
  getPageNum: State;
  getPost: State;
};
// 아래의 방식으로 나만의 타입을 정의 할 수 있음
// 여전히 문제 사항은 개선되지 않았음
type UserGetApi = {
  getUser: GlobalApiStatus["getUser"];
  getPageNum: GlobalApiStatus["getPageNum"];
  getPost: GlobalApiStatus["getPost"];
};
// 자동으로 키명을 받아올 수 있다면? 오타 줄임, 코드 개선 효율적
// 위의 코드와 완벽히 동일한 코드가 된다.
type UserGetApiAuto = {
  // 맵핑을 사용하면 된다.
  [key in "getUser" | "getPageNum" | "getPost"]: GlobalApiStatus[key];
};
```

- 위의 코드 역시 상당히 문법적으로 복잡하고, 가독성도 떨어짐

```ts
// Utility 를 활용해보자
type UserGetApiPick = Pick<
  GlobalApiStatus,
  "getUser" | "getPageNum" | "getPost"
>;
```

- omit

```ts
// Omit = 제외하기
type UserGetApiOmit = Omit<GlobalApiStatus, "getPost">;
```

- keyof

```ts
// keyof 활용 : 객체 타입에서 키명만 추출 가능
type UserGetApiAll = keyof GlobalApiStatus;
const key1: UserGetApiAll = "getUser";
const key2: UserGetApiAll = "getPost";
const key3: UserGetApiAll = "getPageNum";
```

```ts
// 모두 가져오기 (키명만 다 가져오고싶다)
// 오타 줄여줌, 자동으로 속성명과 타입을 추출해줌
/**
 * {
    getUser: State;
    getPageNum: State;
    getPost: State;
}
 */
type UserGetApiAll2 = {
  [key in keyof GlobalApiStatus]: GlobalApiStatus[key];
};

("getUser");
("getPost");
("getPageNum");
```

- 원하는 항목만 제거하기

```ts
// Utility 를 사용해서 원하는 항목 만 제거하기
/**
 * {
    getUser: State;
    getPageNum: State;
}
 */
type UserGetApiAll3 = {
  [key in Exclude<keyof GlobalApiStatus, "getPost">]: GlobalApiStatus[key];
};
```

- 옵셔널 설정

```ts
// 원하는 속성의 이름과 타입을 추출했는데, 나는 옵셔널로 설정하고싶다. (있을수도있고 없을수도 있고)
/**
 * {
    getUser?: State;
    getPageNum?: State;
}
 */
type UserGetApiAll4 = {
  [key in Exclude<keyof GlobalApiStatus, "getPost">]?: GlobalApiStatus[key];
};
```

## 예제 2

```ts
interface LoadingState {
  type: "loading";
  data: string[];
}
interface ErrorState {
  type: "error";
  message: string;
}

type FetchStatus = LoadingState | ErrorState;

// type StatusType = "loading" | "error"
type StatusType = FetchStatus["type"];
```

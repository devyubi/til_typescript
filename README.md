# TS 심화 - Enum

- 여러개의 상수를 정의해서 사용할 때 유용
- API 요청시 활용을 자주 함
- 오타를 줄여줌 (협업시 유용)
  변하는 과정 1.

```ts
/**
 * API 요청을 한다
 * 4가지의 상태가 흔히 활용됨
 *
 * DONE - 요청을 실행 상태
 * LOADING - 요청이 진행 중인 상태
 * ERROR - 요청이 실패 상태
 * INIT - 초기 상태
 */

function runNetwork() {
  let status = "INIT";
  try {
    status = "LOADING";
    // 복잡한 처리 를 진행할 것임
    // 복잡한 처리 를 진행할 것임

    status = "DONE";
  } catch (error) {
    status = "ERROR";
  } finally {
    return status;
  }
}
console.log(runNetwork() === "DONE");
```

변하는 과정2.

```ts
const doneStatus = "DONE";
const loadingStatus = "LOADING";
const errorStatus = "ERROR";
const initStatus = "INIT";

function runNetwork() {
  let status = initStatus;
  try {
    status = loadingStatus;
    // 복잡한 처리 를 진행할 것임
    // 복잡한 처리 를 진행할 것임

    status = doneStatus;
  } catch (error) {
    status = errorStatus;
  } finally {
    return status;
  }
}
console.log(runNetwork() === "DONE");
```

변하는 과정 3

```ts
/**
 * API 요청을 한다
 * 4가지의 상태가 흔히 활용됨
 *
 * DONE - 요청을 실행 상태
 * LOADING - 요청이 진행 중인 상태
 * ERROR - 요청이 실패 상태
 * INIT - 초기 상태
 */
export enum Status {
  DONE = "DONE",
  LOADING = "LOADING",
  ERROR = "ERROR",
  INIT = "INIT",
}
const doneStatus = "DONE";
const loadingStatus = "LOADING";
const errorStatus = "ERROR";
const initStatus = "INIT";

function runNetwork() {
  let status = Status.INIT;
  try {
    status = Status.LOADING;
    // 복잡한 처리 를 진행할 것임
    // 복잡한 처리 를 진행할 것임

    status = Status.DONE;
  } catch (error) {
    status = Status.ERROR;
  } finally {
    return status;
  }
}
console.log(runNetwork() === "DONE");
```

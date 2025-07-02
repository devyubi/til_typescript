# Asynchronous (비동기)

- `비동기 처리` 란 js 에서 너무 오래 시간 소비를 하는 작업
- 1. 백엔드 서버에게 자료를 요청하고 회신을 기다리는 경우
- 2. 파일을 읽어들이고, 서버로 파일을 전송하고 결과를 기다리는 경우
- 비동기 처리는 시간이 많이 걸리는 작업 진행 중에 다른 일도 `병렬로 처리` 하도록 함.

## 1. 종류

- XHR (Xml Http Request)
- Callback 함수 : 자료를 요청을 하고 자료가 오면 나중에 실행하는 함수
- Promise
- async / await

## 2. Dummy/Mockup 사이트 (BE 자료를 회신)

- https://jsonplaceholder.typicode.com/
- https://www.data.go.kr/

## 3. BE 데이터 API 확인 프로그램

- PostMan 설치 및 활용 필요
- https://www.postman.com/
- BE 측에 Swagger 구성을 요청하면 참 좋음

## 4. XHR (Xml Http Request)

- `Request` : 자료 요청
- `Response` : 결과 회신
- `Query` : Request를 한 문자열.

### 4.1. 쿼리의 이해

- `https://isearch.interpark.com/result?q=부산&referrer=`
- 도메인 : `https://isearch.interpark.com`
- 라우터 경로 : `/result`
- 쿼리(자료요청 문자열)의 시작 : `?`
- 실제쿼리 : `q=부산&referrer=`

### 4.2. 실제쿼리 상세 설명

- 실제쿼리 : `q=부산&referrer=`
- q (= 변수) = 부산
- `&` 로 구분
- 변수 referrer = null

### 4.3 Query 예제

- https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/

### 4.4 쿼리를 전송시에는 5가지 방식으로 보낼 수 있다.

- GET : 자료를 주세요 (DB에서 자료를 읽고 결과 회신)
- POST : 자료를 전송합니다 (DB에서 자료 한개 추가)
- DELETE : 자료를 삭제하세요 (DB에서 자료 한개 삭제)
- PUT : 하나의 자료내용 전부를 교체하세요 (DB에서 자료 한개 전체 수정)
- PATCH : 하나의 자료내용중 한 부분만 수정하세요 (DB에서 자료 한개 중 일부 수정)

### 4.5 XHR 로 비동기 작업해보기

```js
//jQuery
// 전체 게시글 요청하는 함수
function getPosts() {
  console.log("전체자료 주세요");
  // 1. xhr 객체를 만든다.
  const xhr = new XMLHttpRequest();
  // 2. BE 에서 알려준 주소로 접속한다.
  // xhr.open("방식", "주소")
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
  // 3. 만들어 둔 xhr 을 전송한다.
  xhr.send();
  console.log("자료를 전송하였습니다.");
  console.log("다음 작업 진행합니다.");
  //4. BE에서 회신된 결과가 오면 실행한다.
  xhr.onload = function () {
    console.log("요청 처리가 된 경우의 결과 : ", xhr);
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else if (xhr.status === 404) {
    } else if (xhr.status === 505) {
      console.log("서버가 꺼졌습니다. 잠시 후 다시 시도해주세요.");
    }
  };
}
// 요청하기
getPosts();
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // 전체 게시글 요청하는 함수
      function getPosts() {
        console.log("전체자료 주세요.");
        // 1. xhr 객체를 만든다.
        const xhr = new XMLHttpRequest();

        // 2. 백엔드에서 알려준 주소로 접속한다.
        // xhr.open("방식", "주소")
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

        // 3. 만들어든 xhr 을 전송합니다.
        xhr.send();
        console.log("자료를 전송하였습니다.");
        console.log("다음 작업 진행합니다.");

        // 4. 백엔드에서 회신된 결과가 오면 실행합니다.
        xhr.onload = function () {
          console.log("요청 처리가 된 경우의 결과 : ", xhr);
          if (xhr.status === 200) {
            console.log(xhr.responseText);
          } else if (xhr.status === 404) {
            console.log("없는 페이지로 접속하셨습니다.");
          } else if (xhr.status === 505) {
            console.log("서버가 꺼졌습니다. 잠시 후 다시 시도해주세요.");
          }
        };
      }
      // 요청하기
      // getPosts();

      function getAlbums() {
        console.log("앨범전체 자료 요청");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/albums");
        xhr.send();
        xhr.onload = function () {
          if (xhr.status === 200) {
            console.logt(xhr.responseText);
          } else if (xhr.status === 404) {
            console.log("주소 및 쿼리 확인하세요.");
          } else if (xhr.status === 505) {
            console.log("서버가 전원이 꺼졌습니다. 다시 시도해주세요.");
          }
        };
      }
      // getAlbums();

      function getPhotos() {
        console.log("사진 자료 요청");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/photos");
        xhr.send();
        xhr.onload = function () {
          if (xhr.status === 200) {
            console.logt(xhr.responseText);
          } else if (xhr.status === 404) {
            console.log("주소 및 쿼리 확인하세요.");
          } else if (xhr.status === 505) {
            console.log("서버가 전원이 꺼졌습니다. 다시 시도해주세요.");
          }
        };
      }
      //getPhotos();

      function getTodos() {
        console.log("할일 자료 요청");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/todos");
        xhr.send();
        xhr.onload = function () {
          if (xhr.status === 200) {
            console.logt(xhr.responseText);
          } else if (xhr.status === 404) {
            console.log("주소 및 쿼리 확인하세요.");
          } else if (xhr.status === 505) {
            console.log("서버가 전원이 꺼졌습니다. 다시 시도해주세요.");
          }
        };
      }
      getTodos();
    </script>
  </body>
</html>
```

### 4.6 콜백 함수로 개선해보기

- 코드 개선 시도
- 예) 주소와 메서드를 편리하게 개선
- `call back hell` 이 발생할 수 있음.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      /**
       * 지정된 주소로 Http 요청을 보내고 결과를 함수로 처리함.
       *
       * @param {string} addr - 요청을 보낼 URL (예: "posts", "albums")
       * @param {"GET"|"POST"|"PUT"|"DELETE"|"PATCH" } method - HTTP 메소드 종류
       * @param {(responseText:string) => void} callback - 요청 성공시 실행할 콜백함수
       */
      function getData(addr, method, callback) {
        const url = `https://jsonplaceholder.typicode.com/${addr}`;
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send();
        xhr.onload = function () {
          if (xhr.status === 200) {
            // 콜백함수 자리
            callback(xhr.responseText);
          } else if (xhr.status === 404) {
            console.log(`${addr}의 쿼리가 잘못되었습니다. 확인하세요.`);
          } else if (xhr.status === 505) {
            console.log("서버가 오류입니다. 다시 시도해주세요.");
          }
        };
      }

      function postsParse(_data) {
        console.log("게시글 결과 === ");
        console.log(_data);
      }
      function albumsParse(_data) {
        console.log("앨범 결과 === ");
        console.log(_data);
      }
      function photosParse(_data) {
        console.log("사진 결과 === ");
        console.log(_data);
      }
      function todosParse(_data) {
        console.log("사진 결과 === ");
        console.log(_data);
      }
      getData("posts", "GET", postsParse);
      getData("albums", "GET", albumsParse);
      getData("photos", "GET", photosParse);
      getData("todos", "GET", todosParse);
    </script>
  </body>
</html>
```

### 4.7

## 5. Promise

- `Call Back HEll` 에 의한 단계별 실행 과정에 대한 (편리한) 해결 방안 제공
- Server 연동이 끝날 때, `성공 함수` 와 `실패함수` 2개를 매개변수로 받아서 실행
- 2개의 함수는 서버연동이 완료되면 자동실행 되도록 구성.

### 5.1. Promise 는 2개의 매개변수(즉 콜백함수) 를 받음

- resolve 콜백함수 : 백엔드 정상 결과 처리 함수
- reject 콜백함수 : 백엔드 오류 결과 처리 함수

### 5.2. Promise 는 3가지의 상태가 있습니다.

- Pending : 결과를 대기중 ...
- Resolved : 성공됨!
- Rejected : 실패함!

### 5.3 Promise Chaining 예제

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      /**
       * 지정된 주소로 Http 요청을 보내고 결과를 함수로 처리함.
       *
       * @param {string} addr - 요청을 보낼 URL (예: "posts", "albums")
       * @param {"GET"|"POST"|"PUT"|"DELETE"|"PATCH" } method - HTTP 메소드 종류
       * @param {(responseText:string) => void} callback - 요청 성공시 실행할 콜백함수
       */
      function getData(addr, method) {
        // 주소
        const url = `https://jsonplaceholder.typicode.com/${addr}`;
        return new Promise(function (resolve, rejected) {
          // 하고 싶은 XHR
          const xhr = new XMLHttpRequest();
          xhr.open(method, url);
          xhr.send();

          xhr.onload = function () {
            if (xhr.status === 200) {
              // 성공(resolve) 함수 자리
              resolve(xhr.responseText);
            } else if (xhr.status === 404) {
              // 실패(rejected) 함수 자리
              rejected.log(`${addr} 의 쿼리가 잘못되었습니다. 확인하세요.`);
            } else if (xhr.status === 505) {
              rejected.log("서버가 오류입니다. 다시 시도해주세요.");
            } else {
              rejected(`알 수 없는 오류입니다.${xhr.status}`);
            }
          };
        });
      }

      function postsParse(_data) {
        console.log("게시글 결과 ==== ");
        console.log(_data);
      }
      function albumsParse(_data) {
        console.log("앨범 결과 ==== ");
        console.log(_data);
      }
      function photosParse(_data) {
        console.log("사진 결과 ==== ");
        console.log(_data);
      }
      function todosParse(_data) {
        console.log("할일 결과 ==== ");
        console.log(_data);
      }
      getData("posts", "GET")
        .then(function (res) {
          //then : 성공 했을 때 라는 뜻
          postsParse(res);
          return getData("posts", "GET");
        })
        .then(function (res) {
          albumsParse(res);
          return getData("posts", "GET");
        })
        .then(function (res) {
          photosParse(res);
          return getData("photos", "GET");
        })
        .then(function (res) {
          todosParse(res);
          return getData("todos", "GET");
        })
        .catch(function (err) {
          console.log(err);
        });
      return getData("albums", "GET");
      getData("albums", "GET");
      getData("photos", "GET");
      getData("todos", "GET");
    </script>
  </body>
</html>
```

## 6. async / await

- 쉽고, 좋음. 단, 규칙 (문법)을 지켜야함.

## 6.1 반드시 다음 처럼 코딩해야함.

- (1) 반드시 함수여야 함.

```js
function getAllData() {}
```

- (2) 반드시 function 앞에 `async` 를 붙여줌.

```js
async function getAllData() {}
```

- (3) 반드시 function 안쪽에 try ~ catch를 작성.

```js
async function getAllData() {
  try {
  } catch (error) {}
}
```

- 실행하려는 함수는 반드시 try 블럭 안쪽에 배치.
- 실행하려는 함수는 반드시 앞에 await 을 붙여줌.

```js
async function getAllData() {
  try {
    // await 는 결과가 나올 때까지 기다리라는 뜻. (순차적으로 진행된다.)
    await getData("posts", "GET");
    await getData("albums", "GET");
    await getData("photos", "GET");
    await getData("todos", "GET");
  } catch (error) {}
}
```

### 6.2 XHR 대신에 fetch 추천

```js
async function getData(addr, method) {
  // 주소
  const url = `https://jsonplaceholder.typicode.com/${addr}`;
  try {
    const response = await fetch(url, { method });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
}
```

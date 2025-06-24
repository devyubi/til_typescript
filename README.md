# Object (객체) 정리

- 데이터와 데이터를 다루는 기능을 가진 결과물

```js
/** const 객체명 = {
    데이터명 : 데이터값;
    기능명 : function(){데이터 가공}
    }
**/

const 객체명 = {
    속성명 : 속성값;
    메소드 : function(){데이터 가공}
}
```

## 1. 가장 간단하게 객체를 만드는 법

- 타이핑으로 객체 `{}` 를 적어서 만든다고 해서 `객체 리터럴` 이라고 함
- 객체 리터럴로 만들 경우 무조건 지키기.

```js
const 객체명 = {
  속성명1: 속성값,
  속성명2: 속성값,
};
```

- 만약 한개의 객체를 생성하는 경우라면 추천
- 만약 한개의 객체를 생성하는 경우라면 이름은 `카멜케이스` 로 하기. (규칙임)

```js
const personInfo = {
  nickName: "문유비",
  age: 29,
  job: "학생",
};
```

## 2. 객체를 무한하게 생성하는 함수 작성

- 여러개의 객체를 생성하는 경우는 파스칼 케이스 를 함수이름으로 지정하기. (규칙임)

```js
function PersonInfo() {
  this.name = "문유비";
  this.age = 20;
  this.job = "학생";
}
```

- 절대로 주의 해야 할 것
- 객체를 생성하고 싶은 경우 new 를 꼭 붙여야함.

```js
function PersonInfo() {
  this.name = "문유비";
  this.age = 20;
  this.job = "학생";
}

PersonInfo(); //함수 실행으로 진행
new PersonInfo(); // 함수 실행 결과로 객체를 생성함
```

## 3. 케이스를 구분해서 생각해보기

### 1. 그냥 함수로 사용한다면 ?

- 아래처럼 함수를 실행하면 this 가 window 가 됨
- 우리가 원하는 값이 아님

```js
function PersonInfo() {
  this.name = "문유비";
  this.age = 20;
  this.job = "학생";
}

PersonInfo();

/** 실행 결과 : 자동으로 window / var 로 바뀜
 * function PersonInfo() {
  window.name = "문유비";
  window.age = 20;
  window.job = "학생";
}

PersonInfo();

--------------
  var.name = "문유비";
  var.age = 20;
  var.job = "학생";

위와 같은 값이 나타남.
/
```

```js
function PersonInfo() {
  this.name = "문유비";
  this.age = 20;
  this.job = "학생";
}


const user = new PersonInfo(); // 객체 생성자 함수 실행으로 진행
/** 하단은 우리가 원한 user 에 담긴 객체
 name : "문유비";
  age : 20;
  job : "학생"; /
```

## 4. 객체의 항목을 참조하는 법

- `.` 으로 참조하는 법

```js
const 유비 = {
  age: 29,
  name: "문유비",
};
console.log(유비.age);
console.log(유비.name);
```

- 연관배열 방식으로 항목 참조하는 법

```js
const 유비 = {
  age: 29,
  name: "문유비",
};
console.log(유비["age"]);
console.log(유비["name"]);
```

- for ... in 방식으로 항목 참조하는 법

```js
const 유비 = {
  age: 29,
  name: "문유비",
};
console.log(유비.age);
console.log(유비.name);

for (let key in 유비) {
  console.log(key); // "age", "name"
  유비[key];
}
```

## 5. 객체에 기능 추가하기 (메소드)
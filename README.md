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

```ts
const 객체명 : {데이터명:종류; 기능명:() => 리턴타입종류} = {
    데이터명 : 데이터값;
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

```ts
const 객체명: { property: 종류; method: () => 리턴타입종류 } = {
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

```ts
const personInfo: { nickname: string; age: number; job: string } = {
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

- 많이 복잡함. 추후 필요로 한 것은 class 라는 문법.

```ts
function PersonInfo(this: { name: string; age: number; job: string }) {
  this.name = "문유비";
  this.age = 20;
  this.job = "학생";
}

const result = {
  name: "문유비",
  age: 20,
  job: "학생",
};


-----좀 더 간단하게----

type PersonInfoType = { name: string; age: number; job: string };
function PersonInfo(this: PersonInfoType) {
  this.name = "문유비";
  this.age = 20;
  this.job = "학생";
}

const result = {
  name: "문유비",
  age: 20,
  job: "학생",
};


-----위보다 더 간단하게 (추천)-----

type PersonInfoType = {
  name: string;
  age: number;
  job: string;
};

function PersonInfo(this: PersonInfoType) {
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

```ts
type PersonInfoType = {
  name: string;
  age: number;
  job: string;
};
function PersonInfo(this: PersonInfoType): void {
  this.name = "문유비";
  this.age = 20;
  this.job = "학생";
  // Default 로 this 가 리턴됩니다.
  // return this;
}

// ts 에선 new 는 class 로 생성을 원활히 지원함
// 객체 생성자 함수를 ts 로 하려면 편법을 써서 할 수 밖에 없음.

const result: PersonInfoType = new (PersonInfo as unknown as {
  new (): PersonInfoType;
})(); // 함수 실행 결과로 객체를 생성함.
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

- 1. 해결 방법 중 key of
  - `keyof`는 객체의 `key를 문자열로 만듦.
  - 아래에 예에서는 age를 "age"로 문자열로 만듦.

keyof 예제

```ts
type IUType = {
  age: number;
  name: string;
};
```

- 2. 해결 방법 중 as : Type Asserstion (타입 단언)

  - `특정 타입이라고 확신한다`라고 컴파일러에게 알려줌

- 3. 해결 방법 중 Object.entries
  - `기본 내장 Object 객체`의 entries 메소드를 활용함
  - entries 메소드는 객체의 속성에 [key, value] 로 출력시켜줌

```ts
type IUType = {
  age: number;
  name: string;
}
const iu: IUType = {
  age: 20,
  name: "아이유",
};

for (const key in iu) {
  const value = iu[key as keyof IUType];
  console.log(key); // "age", "name"
  console.log(value); // 20, "아이유"
}

---------------------------------------------

// 방법 1: keyof를 사용한 타입 단언
for (let key in iu) {
  console.log(key); // "age", "name"
  console.log(iu[key as keyof IUType]); // 20, "아이유"
}

// 방법 2: Object.entries 사용
for (const [key, value] of Object.entries(iu)) {
  console.log(key, value); // "age" 20, "name" "아이유"
}

// 방법 3: 명시적 키 타입 지정
for (const key of Object.keys(iu) as (keyof IUType)[]) {
  console.log(key, iu[key]);
}
```

## 5. 복습 예제

```js
const 블랙핑크_멤버_이름_1 = "제니";
const 블랙핑크_멤버_이름_2 = "로제";
const 블랙핑크_멤버_이름_3 = "지수";
const 블랙핑크_멤버_이름_4 = "리사";

const 블랙핑크_멤버_생일_1 = "96-01";
const 블랙핑크_멤버_생일_2 = "96-02";
const 블랙핑크_멤버_생일_3 = "96-03";
const 블랙핑크_멤버_생일_4 = "96-04";

const 블랙핑크_멤버_이름 = ["제니", "로제", "지수", "리사"];
블랙핑크_멤버_이름[2]; //지수.  0 1 2 순서임. 대괄호 안 2번 이름은 index.
const 블랙핑크_멤버_생일 = ["96-01", "96-02", "96-03", "96-04"];

const 블랙핑크_멤버_제니 = { 이름: "제니", 생일: "96-01" };
const 블랙핑크_멤버_로제 = { 이름: "로제", 생일: "96-02" };
const 블랙핑크_멤버_지수 = { 이름: "지수", 생일: "96-03" };
const 블랙핑크_멤버_리사 = { 이름: "리사", 생일: "96-04" };
블랙핑크_멤버_지수.이름; //지수
블랙핑크_멤버_지수["이름"]; //지수

const 블랙핑크_멤버 = [
  { 이름: "제니", 생일: "96-01" },
  { 이름: "로제", 생일: "96-02" },
  { 이름: "지수", 생일: "96-03" },
  { 이름: "리사", 생일: "96-04" },
]; //최종 형태.

블랙핑크_멤버[2].이름; //지수
블랙핑크_멤버[2]["이름"]; //지수
```

```ts
const 블랙핑크_멤버_이름_1: string = "제니";
const 블랙핑크_멤버_이름_2: string = "로제";
const 블랙핑크_멤버_이름_3: string = "지수";
const 블랙핑크_멤버_이름_4: string = "리사";

const 블랙핑크_멤버_생일_1: string = "96-01";
const 블랙핑크_멤버_생일_2: string = "97-02";
const 블랙핑크_멤버_생일_3: string = "95-01";
const 블랙핑크_멤버_생일_4: string = "97-03";

const 블랙핑크_멤버_이름: string[] = ["제니", "로제", "지수", "리사"];
블랙핑크_멤버_이름[2]; // 지수

const 블랙핑크_멤버_생일: string[] = ["96-01", "97-02", "95-01", "97-03"];

const 블랙핑크_멤버_제니: { 이름: string; 생일: string } = {
  이름: "제니",
  생일: "96-01",
};
const 블랙핑크_멤버_로제: { 이름: string; 생일: string } = {
  이름: "로제",
  생일: "97-02",
};
const 블랙핑크_멤버_지수: { 이름: string; 생일: string } = {
  이름: "지수",
  생일: "95-01",
};
블랙핑크_멤버_지수.이름; // 지수
블랙핑크_멤버_지수["이름"]; // 지수

const 블랙핑크_멤버_리사: { 이름: string; 생일: string } = {
  이름: "리사",
  생일: "97-03",
};

const 블랙핑크_멤버: { 이름: string; 생일: string }[] = [
  { 이름: "제니", 생일: "96-01" },
  { 이름: "로제", 생일: "97-02" },
  { 이름: "지수", 생일: "95-01" },
  { 이름: "리사", 생일: "97-03" },
];

블랙핑크_멤버[2].이름; // 지수
블랙핑크_멤버[2]["이름"]; // 지수
```

## 6. 객체에 기능 추가하기 (메소드)

- 객체에 안에 만든 `함수`를 `Method, Behavior(행동)`

### 6.1 손으로 만든 객체 리터럴에 기능 추가하기

```js
const 블랙핑크_멤버_제니 = {
  이름: "제니",
  생일: "96-01",
  // 기능 (Method)
  sing: function () {
    console.log("제니가 노래합니다.");
  }, // 이 문구를 추가하면 제니가 노래하는 기능을 가짐.
};

블랙핑크_멤버_제니.sing();
```

```js
const 블랙핑크_멤버_제니 = {
  이름: "제니",
  생일: "96-01",
  // 기능 (Method)
  sing: function () {
    console.log(`${this.이름}가 노래합니다.`);
  }, // this 는 {} 안쪽을 가르킴.
  dance: function () {
    console.log(`${this.이름}가 춤을 춥니다.`);
  },
};

블랙핑크_멤버_제니.sing();
블랙핑크_멤버_제니.dance();
```

### 6.2 객체 생성자 함수로 생성된 객체에 기능 추가하기

- new 를 반드시 붙여서 함수를 실행해야만 함
- 반드시 관례상 `Pascal` 로 이름을 정함

```js
function Student() {
  this.no = "0103";
  this.name = "홍길동";
}

// new 로 만든 변수는 인스턴스 라고 함.
const 학생_1 = new Student();
{no: "0103", name:"홍길동"} // 결과

const 학생_2 = new Student();
{no: "0103", name:"홍길동"} // 결과

const 학생_3 = new Student();
{no: "0103", name:"홍길동"} // 결과
```

-----업그레이드 버전-----

```js
function Student(_번호,_이름) {
  this.no = _번호;
  this.name = _이름;
}

// new 로 만든 변수는 인스턴스 라고 함.
const 학생_1 = new Student("0208", "김길동");
{no: "0208", name:"김길동"} // 결과

const 학생_2 = new Student("0305", "고길동");
{no: "0305", name:"고길동"} // 결과

const 학생_3 = new Student("0308", "홍길동");
{no: "0308", name:"홍길동"} // 결과
```

-----업그레이드 버전 (메소드 추가)-----

```js
function Student(_번호,_이름) {
  this.no = _번호;
  this.name = _이름;
  this.say = function(){ // say 는 기능이다 라는 뜻
    console.log(`${this.name}은 ${this.no}입니다`);
  };
  this.hi = () => {
    console.log(`${this.name}님 안녕하세요`)
  };
}

// new 로 만든 변수는 인스턴스 라고 함.
const 학생_1 = new Student("0208", "김길동");
{no: "0208", name:"김길동", say: fn, hi: fn} // 결과

const 학생_2 = new Student("0305", "고길동");
{no: "0305", name:"고길동", say: fn, hi: fn} // 결과

const 학생_3 = new Student("0308", "홍길동");
{no: "0308", name:"홍길동", say: fn, hi: fn} // 결과
```

### 6.3 객채에 속해 있는 메소드를 축약해서 생성하는 문법

```js
const ub = {
  name: "문유비",
  sing: function () {
    // 메소드 아님.
    console.log(`${this.name}이 노래해요.`);
  },
  dance() {
    // 메소드 축약형 (메소드임. = 기능이 메소드다 라고 생각하면 된다.)
    console.log(`${this.name}이 춤을 춰요.`);
  },
};
```

```js
function Student(_번호, _이름) {
  this.no = _번호;
  this.name = _이름;
  this.say = function () {};
  this.hi = () => {};
}
```

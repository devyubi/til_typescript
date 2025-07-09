interface Animal {
  name: string;
}
const ani: Animal = {
  name: "홍길동",
};

// extends = 확장하다
interface Dog extends Animal {
  bark(): void;
}
const dog: Dog = {
  name: "댕댕이",
  bark: () => console.log("멍멍"),
};

interface Cat extends Animal {
  cry(): void;
}
const cat: Cat = {
  name: "야옹이",
  cry: () => console.log("야옹"),
};

interface Person extends Animal {
  say(): void;
}

const iu: Person = {
  name: "아이유",
  say: () => console.log("안녕"),
};

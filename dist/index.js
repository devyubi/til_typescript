class Animal {
  constructor() {
    this.eye = 2;
  }
  cry() {}
  eat() {}
}
class Cat extends Animal {
  constructor() { //constructor 이거 안적어도 되는데 그냥 적음. (안적어도 실행 된다!!)
    super(); // 맨~~~위 애니멀의 컨스트럭터를 실행하라는 뜻
  }
  꾹꾹이() {}
}
class Dog extends Animal {
  constructor() {}
  멍멍() {}
}

new Cat();
class Animal {
  name: string; // (안적으면 public) 모든 접근 가능
  private age: number; // 모든 접근 불가
  protected breez: string; // 상속시 접근 가능
  // 메서드
  test() {
    this.name;
    this.age;
    this.breez;
  }
}

class Cat extends Animal {
  show() {
    this.name; // 접근가능
    this.age; // 프라이빗이라 접근 불가능 (ERROR)
    this.breez; // 접근가능
  }
}

const c= new Cat();
c.name; // 접근가능
c.age; // 접근 불가
c.breeze // 접근 불가 (protected) 내부 속성에서만 접근 가능
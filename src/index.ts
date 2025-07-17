interface Human {
  name: string;
  age: number;
}
interface Contacts {
  phone: string;
  address: string;
}
type HumanContacts = Human & Contacts;
// 반드시 모든 속성이 존재해야 함

let iu: HumanContacts = {
  address: "서울",
  age: 28,
  name: "아이유",
  phone: "000-0000-0000",
};

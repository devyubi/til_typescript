// 권장함
interface 약속 {
  name: string;
}
class Person implements 약속 {
  name: string;
}
// 아래도 가능하지만, 권장하진 않음
type 약속타입 = {
  name: string;
};
class Dog implements 약속타입 {
  name: string;
}

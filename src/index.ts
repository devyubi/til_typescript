type User = { age: number; nickName: string; isMember: boolean };

const obj: User = {
  age: 10,
  nickName: "hong",
  isMember: true,
};
Object.keys(obj).forEach((key) => {
  const typedKey = key as keyof User;
  console.log(typedKey); // 'age' | 'nickName' | 'isMember'
  console.log(obj[typedKey]); // 10, "hong", true
});

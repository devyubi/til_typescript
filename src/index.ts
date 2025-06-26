type UserAddressType = {
  city: string;
  age: number;
};

type UserType = {
  name: string;
  address: UserAddressType;
};

const user: UserType = {
  name: "정국",
  address: { city: "서울", age: 20 },
};

const {
  name,
  address: { city, age },
}: UserType = user;

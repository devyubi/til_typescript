// fetch 또는 axios 를 이용해서 데이터를 연동시 엄청 자주 활용함
const afterTwoSeconds = function (): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 성공시 실행할 함수
      resolve("성공이므로 실행함");
    }, 2000);
  });
};

const runner = async () => {
  const res = await afterTwoSeconds();
  console.log(res);
};

runner();

let numA: number = 5;
let numB: number = 8;

const resultPuls: number = numA + numB;
const resultMinus: number = numA - numB;
const resultDevide: number = numA / numB;
const resultMulti: number = numA * numB;

/** 
 실제 설명서 예시
 * 사칙연산 함수
 * - 숫자 2개를 입력하시면 결과가 나옵니다.
 * - 기호는 4가지 (+, -, *, /)를 사용하실 수 있습니다.
 * 
 * 사용예시
 * ```javascript
 * const result:number = calc(5,4,"+");
 * ```
 * @param {number} a
 * @param {number} b
 * @param {string} sign
 * @returns {number}
*/

// param = 재료
function calc(a: number, b: number, sign: string): number {
  let result;
  switch (sign) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a !== 0 && b !== 0 ? a / b : 0;
      // 0으로 나누기 방지
      break;
  }
  return result;
}

const result: number = calc(7, 10, "*");

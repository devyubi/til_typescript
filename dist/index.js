/** 사용 설명서
 * 지정된 주소로 http 요청을 보내고 결과를 함수로 처리함.
 * @param {string} addr - 요청을 보낼 URL (예:"posts", "albums")
 * @param {"GET"|"POST"|"PUT"|"PATCH"} method - HTTP 메소드 종류
 * @param {(responseText:string)=>void} callback - 요청 성공시 실행할 콜백함수
 */

function getData(addr, method, callback) {
  const url = `https://jsonplaceholder.typicode.com/${addr}`;
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.send();
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 콜백 함수자리
      callback(xhr.responseText);
    } else if (xhr.status === 404) {
      consle.log("쿼리가 잘못되었습니다. 확인하세요.");
    } else if (xhr.status === 505) {
      console.log("서버가 오류입니다. 다시 시도해주세요.");
    }
  };
}
function postsParse(_data) {} // postParse : 해석하다
function albumsParse(_data) {}
function photosParse(_data) {}
function todosParse(_data) {}
getData("posts", "GET", function () {});
getData("albums", "GET", function () {});
getData("photos", "GET", function () {});
getData("todos", "GET", function () {});

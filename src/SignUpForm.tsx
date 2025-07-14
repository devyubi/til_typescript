import React from "react";
// 전역(window) 자리
interface SignUpData {
  username: string;
  password: string;
  email: string;
  agree: boolean;
}

function SignUpForm() {
  // ts 자리
  const [formData, setFormData] = userState<SignUpData>({});

  // tsx 자리
  return (
    <form>
      <h2>회원가입폼</h2>
      <input type="text" name="username" />
      <input type="password" name="userpass" />
      <input type="email" name="useremail" />
      <input type="checkbox" name="useragree" />
      <button type="submit">가입하기</button>
    </form>
  );
}

export default SignUpForm;

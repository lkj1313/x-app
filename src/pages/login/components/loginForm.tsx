import React from "react";

import InputField from "./inputFiled";
import SubmitButton from "./submitButton";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onRequestClose: () => void;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  passwordError: string;
  loginError: string;
}
const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onRequestClose,
  email,
  setEmail,
  emailError,
  password,
  setPassword,
  passwordError,
  loginError,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <InputField
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage={emailError}
        />
        <InputField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={passwordError}
        />
        <SubmitButton loginError={loginError} />
      </div>
    </form>
  );
};

export default LoginForm;

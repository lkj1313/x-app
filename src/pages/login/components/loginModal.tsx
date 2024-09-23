import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

import LoginForm from "./loginForm";
import useLogin from "../hook/useLogin";

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  setLoading: (loading: boolean) => void; // 로딩 상태 업데이트 함수 추가
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onRequestClose,
  setLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  // useLogin 훅에서 loginUser 함수를 가져옴
  const { loginUser } = useLogin(onRequestClose);
  useEffect(() => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");
  }, [email, password, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!email) {
      setEmailError("이메일을 입력하세요.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("비밀번호를 입력하세요.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    // 로그인 함수 호출
    loginUser(email, password);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          height: "400px",
          width: "400px",
        },
      }}
    >
      {isOpen && (
        <LoginForm
          onSubmit={handleSubmit}
          onRequestClose={onRequestClose}
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          password={password}
          setPassword={setPassword}
          passwordError={passwordError}
          loginError={loginError}
        />
      )}
    </ReactModal>
  );
};

export default LoginModal;

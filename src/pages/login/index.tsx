import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/loading";
import SignupModal from "./components/signupModal";
import useViewportHeight from "../../hooks/useViewportHeight";
import LoginModal from "./components/loginModal";
import { useGoogleLoginMutation } from "./utility/useGoogleLoginMutation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [showSignUp, setShowSignUp] = useState(false); // SignUpModal 상태 추가
  const [showLogin, setShowLogin] = useState(false);
  const { mutate: handleGoogleLogin, isPending } = useGoogleLoginMutation();

  const handleSignUpClose = () => setShowSignUp(false);
  const handleSignUpShow = () => setShowSignUp(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  useViewportHeight();

  if (isPending) {
    return <Loading />; // 로딩 중일 때 로딩 컴포넌트 표시
  }

  return (
    <>
      {" "}
      <SignupModal
        isOpen={showSignUp}
        onRequestClose={handleSignUpClose}
        setLoading={setLoading}
      />{" "}
      <LoginModal
        isOpen={showLogin}
        onRequestClose={handleLoginClose}
        setLoading={setLoading}
      />
      <div className="login-page">
        <div className="login-page__container">
          <div className="login-page__left-container">
            <img
              className="login-page__logo  login-page__logo--dark"
              src={"/X-white_logo.png"}
              alt="Logo"
            />
          </div>
          <div className="login-page__right-container">
            <span className="login-page__headline">지금 일어나고 있는 일</span>
            <span className="login-page__subheadline">지금 가입하세요.</span>
            <button
              className="login-page__button"
              onClick={() => handleGoogleLogin()}
            >
              Google로 로그인
            </button>
            <div className="login-page__separator">또는</div>
            <button className="login-page__button" onClick={handleSignUpShow}>
              계정만들기
            </button>
            <span className="login-page__terms">
              가입하시려면 쿠키 사용을 포함해 이용약관과 개인정보 처리방침에
              동의해야 합니다.
            </span>
            <span>이미 트위터에 가입하셨나요?</span>
            <button
              className="login-page_loginbutton"
              onClick={handleLoginShow}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

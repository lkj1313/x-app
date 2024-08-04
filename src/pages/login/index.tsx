import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../../firebase"; // Firebase 초기화 파일 가져오기
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import Loading from "../../components/loading";
import SignupModal from "./components/signupModal";
import useViewportHeight from "../../components/useViewportHeight";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [showSignUp, setShowSignUp] = useState(false); // SignUpModal 상태 추가
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const toggleDarkMode = () => {
    // 다크모드 토글
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  const googleLogin = async () => {
    try {
      setLoading(true); // 로딩 상태 활성화
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      // Firestore에 사용자 정보 저장
      if (userDoc.exists()) {
        dispatch(login());
        navigate("/");
      } else {
        // 사용자 문서가 존재하지 않으면 새로 생성
        await setDoc(userDocRef, {
          nickname: user.displayName,
          email: user.email,
        });
        dispatch(login());
        setTimeout(() => {
          navigate("/");
        }, 1000); // 2초 후 홈 페이지로 리디렉션 (원하는 시간으로 변경 가능)
      }

      console.log("User Info:", user);
    } catch (error) {
      console.error("Error during Google login:", error);
      setLoading(false); // 로그인 실패 시 로딩 상태 비활성화
    }
  };
  const handleSignUpClose = () => setShowSignUp(false);
  const handleSignUpShow = () => setShowSignUp(true);
  useViewportHeight();

  if (loading) {
    return (
      <div style={{ height: "calc(var(--vh) * 100)", alignItems: "center" }}>
        <Loading />
      </div>
    ); // 로딩 중일 때 로딩 컴포넌트 표시
  }

  return (
    <>
      {" "}
      <SignupModal
        isOpen={showSignUp}
        onRequestClose={handleSignUpClose}
      />{" "}
      <div className="login-page">
        <div className="login-page__container">
          <div className="login-page__left-container">
            <div className="layout__toggle-box">
              <input
                type="checkbox"
                id="dark-mode-toggle"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <label htmlFor="dark-mode-toggle" className="toggle">
                <img
                  className="toggle__icon toggle__icon--moon"
                  src="/moon.svg"
                  alt="Moon icon"
                />
                <img
                  className="toggle__icon toggle__icon--sun"
                  src="/sun.svg"
                  alt="Sun icon"
                />
              </label>
            </div>
            <img
              className={`login-page__logo ${
                darkMode ? "login-page__logo--dark" : ""
              }`}
              src={darkMode ? "/X-white_logo.png" : "/X_logo.png"}
              alt="Logo"
            />
          </div>
          <div className="login-page__right-container">
            <span className="login-page__headline">지금 일어나고 있는 일</span>
            <span className="login-page__subheadline">지금 가입하세요.</span>
            <button className="login-page__button" onClick={googleLogin}>
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
            <button className="login-page_loginbutton">로그인</button>
          </div>
        </div>
      </div>
    </>
  );
}

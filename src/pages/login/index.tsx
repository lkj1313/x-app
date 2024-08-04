import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  return (
    <div className="login-page">
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
      <div className="login-page__container">
        <div className="login-page__left-container">
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
          <button className="login-page__button">Google로 로그인</button>
          <div className="login-page__separator">또는</div>
          <button className="login-page__button">계정만들기</button>
          <span className="login-page__terms">
            가입하시려면 쿠키 사용을 포함해 이용약관과 개인정보 처리방침에
            동의해야 합니다.
          </span>
          <span>이미 트위터에 가입하셨나요?</span>
          <button className="login-page_loginbutton">로그인</button>
        </div>
      </div>
    </div>
  );
}

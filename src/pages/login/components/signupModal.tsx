import { auth } from "../../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { db } from "../../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";

interface SignupModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  setLoading: (loading: boolean) => void; // 로딩 상태 업데이트 함수 추가
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onRequestClose,
  setLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("유효한 이메일 주소를 입력하세요.");
    } else {
      setEmailError("");
    }

    if (
      password &&
      !/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(password)
    ) {
      setPasswordError(
        "비밀번호는 6자 이상이어야 하며, 특수문자를 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }

    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }

    if (nickname && nickname.length < 1) {
      setNicknameError("닉네임은 한 글자 이상이어야 합니다.");
    } else {
      setNicknameError("");
    }
  }, [email, password, confirmPassword, nickname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !nicknameError &&
      email &&
      password &&
      confirmPassword &&
      nickname
    ) {
      try {
        setLoading(true);
        // Firebase Authentication을 통한 회원가입
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Firestore에 사용자 데이터 저장
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          nickname: nickname,
          profilePicture: "/profile.jpg",
        });

        onRequestClose(); // 회원가입 성공 시 모달 닫기
        alert("회원가입이 완료되었습니다. 로그인 해주세요!");
      } catch (error: any) {
        console.error("회원가입 실패", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } else {
      alert("입력란을 모두 제대로 입력해주세요");
    }
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Signup Modal"
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
          height: "600px",
          width: "400px",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={onRequestClose}
          style={{
            width: "30px",
            fontSize: "30px",
            cursor: "pointer",
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          x
        </button>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/X_logo.png" style={{ width: "50px" }} alt="logo" />
        </div>
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
          <input
            style={{
              width: "100%",
              height: "50px",
              border: "1px solid black",
              backgroundColor: "lightgray",
              marginBottom: "5px",
              color: "black",
              padding: "10px",
            }}
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <div
              style={{
                color: "red",
                marginBottom: "10px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              {emailError}
            </div>
          )}
          <input
            style={{
              width: "100%",
              height: "50px",
              border: "1px solid black",
              backgroundColor: "lightgray",
              padding: "10px",
              marginBottom: "5px",
            }}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <div
              style={{
                color: "red",
                marginBottom: "10px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              {passwordError}
            </div>
          )}
          <input
            style={{
              width: "100%",
              height: "50px",
              border: "1px solid black",
              backgroundColor: "lightgray",
              padding: "10px",
              marginBottom: "5px",
            }}
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <div
              style={{
                color: "red",
                marginBottom: "10px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              {confirmPasswordError}
            </div>
          )}
          <input
            style={{
              width: "100%",
              height: "50px",
              border: "1px solid black",
              backgroundColor: "lightgray",
              padding: "10px",
              marginBottom: "5px",
            }}
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {nicknameError && (
            <div
              style={{
                color: "red",
                marginBottom: "10px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              {nicknameError}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              height: "50px",
              borderRadius: "30px",
              backgroundColor: "#A9A9F5",
              cursor: "pointer",
            }}
          >
            회원가입
          </button>
        </div>
      </form>
    </ReactModal>
  );
};

export default SignupModal;

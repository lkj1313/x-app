import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import { auth, db } from "../../../../firebase";
import { doc, getDoc } from "firebase/firestore";

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("유효한 이메일 주소를 입력하세요.");
    } else {
      setEmailError("");
    }

    if (password && password.length < 6) {
      setPasswordError("비밀번호는 6자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailError && !passwordError && email && password) {
      try {
        // Firebase Authentication을 통한 로그인
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Firestore에서 사용자 데이터 가져오기
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Redux 상태 업데이트
          dispatch(
            login({
              email: userData.email,
              uid: user.uid,
              nickname: userData.nickname,
            })
          );

          alert("로그인 완료!");

          onRequestClose(); // 로그인 성공 시 모달 닫기
          navigate("/");
        } else {
          setLoginError("사용자 데이터를 찾을 수 없습니다.");
        }
      } catch (error: any) {
        console.error("로그인 실패", error);
        switch (error.code) {
          case "auth/user-not-found":
            setLoginError("해당 이메일 주소를 사용하는 계정이 없습니다.");
            break;
          case "auth/wrong-password":
            setLoginError("비밀번호가 잘못되었습니다.");
            break;
          case "auth/invalid-email":
            setLoginError("유효한 이메일 주소를 입력하세요.");
            break;
          default:
            setLoginError("로그인 중 오류가 발생했습니다.");
            break;
        }
      }
    } else {
      setLoginError("입력란을 모두 제대로 입력해주세요");
    }
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
            로그인
          </button>
        </div>
      </form>
    </ReactModal>
  );
};

export default LoginModal;

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");
  }, [email, password, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      setLoading(true); // 로딩 상태 활성화
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("로그인 성공, 사용자 데이터: ", userData);
        dispatch(
          login({
            email: userData.email,
            uid: user.uid,
            nickname: userData.nickname,
            profilePicture: userData.profilePicture,
            createdAt: userData.createdAt,
          })
        );

        onRequestClose();
        navigate("/");
      } else {
        setLoginError("사용자 데이터를 찾을 수 없습니다.");
      }
    } catch (error: any) {
      console.error("로그인 실패", error);
      switch (error.code) {
        case "auth/user-not-found":
          alert("해당 이메일 주소를 사용하는 계정이 없습니다.");
          break;
        case "auth/wrong-password":
          alert("비밀번호가 잘못되었습니다.");
          break;
        case "auth/invalid-email":
          alert("유효한 이메일 주소를 입력하세요.");
          break;
        default:
          alert("로그인 중 오류가 발생했습니다.");
          break;
      }
    } finally {
      setLoading(false); // 로딩 상태 비활성화
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
      {isOpen && (
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
            {emailError && <div style={{ color: "red" }}>{emailError}</div>}

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
              <div style={{ color: "red" }}>{passwordError}</div>
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
            {loginError && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {loginError}
              </div>
            )}
          </div>
        </form>
      )}
    </ReactModal>
  );
};

export default LoginModal;

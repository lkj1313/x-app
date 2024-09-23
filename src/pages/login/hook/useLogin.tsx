import { useState } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../store/authSlice";
import { auth, db } from "../../../../firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";

// 로그인 변수 타입 정의
interface LoginVariables {
  email: string;
  password: string;
}

// 로그인 성공 시 반환되는 데이터 타입 정의
interface LoginResponse {
  user: User;
  userData: DocumentData;
}

const useLogin = (onRequestClose: () => void) => {
  const [loginError, setLoginError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useMutation을 통한 로그인 처리
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginVariables) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("사용자 데이터를 찾을 수 없습니다.");
      }

      return { user, userData: userDoc.data() as DocumentData };
    },
    onMutate: () => {
      setLoginError(""); // 에러 메시지 초기화
    },
    onSuccess: ({ user, userData }) => {
      console.log("로그인 성공, 사용자 데이터: ", userData);
      dispatch(
        login({
          email: userData?.email,
          uid: user.uid,
          nickname: userData?.nickname,
          profilePicture: userData?.profilePicture,
          createdAt: userData?.createdAt,
        })
      );
      onRequestClose(); // 모달 닫기
      navigate("/"); // 홈으로 이동
    },
    onError: (error: any) => {
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
    },
  });

  // 로딩 상태는 mutation의 status로 확인
  const isLoading = loginMutation.status === "pending";

  const loginUser = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  return { loginUser, loginError, loading: isLoading };
};

export default useLogin;

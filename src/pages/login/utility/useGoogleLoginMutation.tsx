import { useMutation, UseMutationResult } from "@tanstack/react-query"; // v5 버전 사용
import { googleLogin } from "./googleLogin";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";

export const useGoogleLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: googleLogin, // googleLogin 함수 실행
    onSuccess: (userData) => {
      console.log("Google login successful!");
      // 로그인 성공 후 유저 데이터를 Redux에 저장
      dispatch(
        login({
          email: userData.email,
          uid: userData.uid,
          nickname: userData.nickname,
          profilePicture: userData.profilePicture || "/profile.jpg",
          createdAt: userData.createdAt,
        })
      );

      // 홈으로 이동
      navigate("/");
    },
    onError: (error) => {
      console.error("Google 로그인 실패:", error);
    },
  });

  return mutation;
};

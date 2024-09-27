import { useMutation } from "@tanstack/react-query";
import useFetchUserPost from "./useFetchUserPost";
import { Post } from "../../home";
import { User } from "../../../store/authSlice";

export const useFetchUserPostMutation = ({
  setUserPosts,
}: {
  setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) => {
  const mutation = useMutation({
    mutationFn: ({ user, lastPost }: { user: User; lastPost?: Post }) =>
      useFetchUserPost(user, lastPost), // lastPost를 받아서 페이지네이션 처리
    onSuccess: (data: Post[]) => {
      setUserPosts((prevPosts) => [...prevPosts, ...data]); // 기존 데이터에 추가
    },
    onError: (error) => {
      console.error("Posts fetch failed:", error);
    },
  });

  return mutation;
};

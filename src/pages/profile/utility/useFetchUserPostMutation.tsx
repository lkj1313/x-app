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
    mutationFn: (user: User) => useFetchUserPost(user), // 데이터를 가져오는 함수 호출
    onSuccess: (data: Post[]) => {
      setUserPosts(data); // 성공 시 posts 상태 업데이트
    },
    onError: (error) => {
      console.error("Posts fetch failed:", error);
    },
  });

  return mutation;
};

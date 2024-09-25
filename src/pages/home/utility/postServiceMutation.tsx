import { useMutation } from "@tanstack/react-query";
import { PostService } from "./postService";
import { User } from "../../../store/authSlice";

const usePostServiceMutation = (
  setPosts: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const mutation = useMutation({
    // mutationFn은 객체를 인자로 받습니다.
    mutationFn: ({
      text,
      img,
      user,
    }: {
      text: string;
      img: File | null;
      user: User | null;
    }) => PostService(text, img, user, setPosts),
    onSuccess: () => {
      console.log("Post Success");
    },
    onError: (error) => {
      console.error("Post 실패:", error);
    },
  });

  return mutation;
};

export default usePostServiceMutation;

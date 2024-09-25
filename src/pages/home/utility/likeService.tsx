import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { toggleLikeOnPost } from "../../../firebase/firebaseService";
import { Post } from "..";
import { User } from "../../../store/authSlice";
export const handleLike = async (
  postId: string,
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  user: User
) => {
  // postId가 string 타입이므로, undefined가 아닐 경우만 처리
  if (!postId) return;

  const post = posts.find((post) => post.id === postId); // argument로 온 postId와 post.id가 같은 요소 찾기
  const userHasLiked =
    Array.isArray(post?.likedBy) && post.likedBy.includes(user?.uid || ""); // true

  try {
    // user.uid가 undefined일 수 있으므로, 옵셔널 체이닝으로 처리
    if (!user?.uid) {
      console.error("User is not logged in or has no valid UID.");
      return;
    }

    await toggleLikeOnPost(postId, user.uid, userHasLiked);

    // 상태에서도 좋아요 수 업데이트
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,

              likedBy: userHasLiked
                ? post.likedBy.filter((uid) => uid !== user.uid) // 이미 좋아요를 눌렀다면 유저의 UID 제거
                : [...post.likedBy, user.uid], // 좋아요를 추가한다면 유저의 UID 추가
            }
          : post
      )
    );
  } catch (error) {
    console.error("Error handling like: ", error);
  }
};

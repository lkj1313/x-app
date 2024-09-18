import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase"; // Firebase 초기화 관련 코드
import { Post } from "../pages/home";

// 좋아요 추가 및 취소 핸들러
export const toggleLikeOnPost = async (
  postId: string,
  userId: string,
  userHasLiked: boolean
) => {
  const postRef = doc(db, "posts", postId);

  try {
    if (userHasLiked) {
      // 이미 좋아요를 눌렀으면 좋아요 취소
      await updateDoc(postRef, {
        likedBy: arrayRemove(userId), // likedBy 배열에서 사용자 ID 제거
      });
    } else {
      // 좋아요 추가
      await updateDoc(postRef, {
        likedBy: arrayUnion(userId), // likedBy 배열에 사용자 ID 추가
      });
    }
  } catch (error) {
    console.error("Error updating likes: ", error);
  }
};

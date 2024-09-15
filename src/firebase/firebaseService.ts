import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";

// 좋아요 수를 1 증가시키는 함수
export const incrementFirebaseLikeCount = async (postId: string) => {
  const postRef = doc(db, "posts", postId);
  try {
    await updateDoc(postRef, {
      likes: increment(1), // Firebase increment()로 좋아요 수 증가
    });
  } catch (error) {
    console.error("Error updating likes: ", error);
  }
};

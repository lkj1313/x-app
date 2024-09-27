import {
  collection,
  where,
  limit,
  getDocs,
  startAfter,
  query,
} from "firebase/firestore";
import { Post } from "../../home";
import { db } from "../../../../firebase"; // Firebase 초기화 파일 경로
import { User } from "../../../store/authSlice";

const useFetchUserPost = async (user: User, lastPost?: Post) => {
  let postsQuery;

  if (lastPost) {
    // lastPost가 있을 때만 startAfter 적용
    postsQuery = query(
      collection(db, "posts"),
      where("author.userEmail", "==", user.email),
      limit(10),
      startAfter(lastPost.createdAt)
    );
  } else {
    // lastPost가 없으면 startAfter 없이 쿼리 생성
    postsQuery = query(
      collection(db, "posts"),
      where("author.userEmail", "==", user.email),
      limit(10)
    );
  }

  const querySnapshot = await getDocs(postsQuery);
  const posts: Post[] = [];
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() } as Post);
  });

  return posts;
};

export default useFetchUserPost;

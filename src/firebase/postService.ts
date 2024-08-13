import { db } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";

// 포스트의 타입 정의
interface Post {
  id?: string;
  userId: string;
  content: string;
  timestamp: any; // Firestore Timestamp
  likes: number;
}

// 포스트 추가하기
export const addPost = async (
  userId: string,
  nickname: string,
  content: string
): Promise<void> => {
  try {
    await addDoc(collection(db, "posts"), {
      userId,
      content,
      timestamp: serverTimestamp(),
      likes: 0,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// 실시간 포스트 가져오기
export const getPosts = (callback: (posts: Post[]) => void): void => {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  onSnapshot(q, (querySnapshot) => {
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as Post);
    });
    callback(posts); // 가져온 포스트를 콜백 함수로 전달
  });
};

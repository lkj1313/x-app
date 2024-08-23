import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../../firebase";
interface Post {
  text: string;
  usernickname?: string | null; // null 허용
  profilePicture?: string | null; // null 허용
  userEmail?: string | null; // null 허용
}

export const addPost = async (post: Post) => {
  try {
    await addDoc(collection(db, "posts"), {
      text: post.text,
      likes: 0,
      comments: [],
      author: {
        username: post.usernickname,
        profilePicture: post.profilePicture,
        userEmail: post.userEmail,
      },
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

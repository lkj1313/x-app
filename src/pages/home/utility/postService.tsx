import { useSelector } from "react-redux";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { RootState } from "../../../store/store";
import { db } from "../../../../firebase";
import { User } from "../../../store/authSlice";

export const PostService = async (
  text: string,
  image: File | null,
  user: User | null,
  setPosts: React.Dispatch<React.SetStateAction<any[]>>
) => {
  if (text.trim()) {
    // 공백이 아닌 경우에만 실행
    const post = {
      text, // 입력된 게시물 텍스트
      usernickname: user?.nickname,
      profilePicture: user?.profilePicture,
      userEmail: user?.email,
    };
    let imageUrl = null; // 이미지 URL을 저장할 변수
    // 이미지가 선택된 경우 Firebase Storage에 업로드
    if (image) {
      const storage = getStorage(); // Firebase Storage 인스턴스 생성
      const storageRef = ref(storage, `posts/${image.name}-${Date.now()}`); // 고유한 파일 경로 설정

      try {
        // 이미지를 Firebase Storage에 업로드
        const snapshot = await uploadBytes(storageRef, image);

        // 업로드된 이미지의 URL 가져오기
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading image: ", error);
        return; // 이미지 업로드에 실패하면 게시물 작성 중단
      }
    }

    try {
      // Firebase Firestore에 새 게시물 추가
      const docRef = await addDoc(collection(db, "posts"), {
        text: post.text,
        imageUrl: imageUrl || "", // 이미지 URL을 Firestore에 저장 (이미지가 없으면 빈 문자열)
        likedBy: [],
        comments: [],
        author: {
          username: post.usernickname,
          profilePicture: post.profilePicture,
          userEmail: post.userEmail,
        },
        createdAt: Timestamp.now(),
      });

      // 새 게시물을 기존 목록의 상단에 추가
      setPosts((prevPosts) => [
        {
          id: docRef.id,
          text: post.text,
          imageUrl,
          likedBy: [],
          comments: [],
          author: {
            username: post.usernickname,
            profilePicture: post.profilePicture,
            userEmail: post.userEmail,
          },
          createdAt: Timestamp.now(),
        },
        ...prevPosts, // 기존 게시물 목록
      ]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};

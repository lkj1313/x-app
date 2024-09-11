import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase"; // firebase 설정 파일에서 auth와 db 가져오기
import { doc, getDoc, setDoc } from "firebase/firestore";

// 유저 정보를 구글로 로그인한 후 데이터베이스에 저장하는 함수
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    // 구글 팝업 로그인
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Firestore에서 해당 유저의 문서 참조
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    // 유저 문서가 이미 있으면 데이터를 리턴하고, 없으면 새로 저장
    if (userDoc.exists()) {
      return userDoc.data(); // 기존 유저 데이터 리턴
    } else {
      // 새로운 유저 정보를 Firestore에 저장
      const newUser = {
        email: user.email,
        uid: user.uid,
        nickname: user.displayName || "Anonymous",
        profilePicture: user.photoURL || "/profile.jpg",
      };
      await setDoc(userDocRef, newUser);
      return newUser;
    }
  } catch (error) {
    throw new Error("Google 로그인 중 오류가 발생했습니다.");
  }
};

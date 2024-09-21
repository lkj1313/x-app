import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase"; // Firebase 설정 파일

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    // 구글 팝업 로그인
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Firestore에서 해당 유저의 문서 참조
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // 기존 유저 데이터 반환
      return userDoc.data();
    } else {
      // 새로운 유저 정보를 Firestore에 저장 후 반환
      const newUser = {
        email: user.email,
        uid: user.uid,
        nickname: user.displayName || "Anonymous",
        profilePicture: user.photoURL || "/profile.jpg",
        createdAt: new Date().toISOString(), // createdAt을 현재 시간으로 설정
      };
      await setDoc(userDocRef, newUser);
      return newUser;
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    throw new Error("Google 로그인 중 오류가 발생했습니다.");
  }
};

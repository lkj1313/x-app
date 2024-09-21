import React, { useRef } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { db, storage } from "../../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfilePicture } from "../../../store/authSlice";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
interface ProfileEditModalProps {
  isOpen: boolean;
  onCloseProfileEditModal: () => void;
}
const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onCloseProfileEditModal,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 선택창 열기
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // 사용자가 선택한 파일을 가져옴

    if (file && user) {
      try {
        // Firebase Storage에 이미지 업로드

        const storageRef = ref(
          storage,
          `profilePictures/${user.uid}/${file.name}`
        ); // 파일 경로 설정
        await uploadBytes(storageRef, file); // 파일을 Firebase Storage에 업로드
        const downloadURL = await getDownloadURL(storageRef); // 업로드된 파일의 다운로드 URL 가져오기

        // Firestore에 프로필 사진 URL 업데이트
        const userDocRef = doc(db, "users", user.uid); // Firestore에서 사용자 문서 참조 가져오기
        await updateDoc(userDocRef, { profilePicture: downloadURL }); // Firestore에 프로필 사진 URL 업데이트

        // Redux 스토어 업데이트
        dispatch(updateProfilePicture(downloadURL)); // Redux 액션에 프로필 사진 URL만 전달
      } catch (error) {
        console.error("Error updating profile picture:", error); // 에러 처리
      }
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {}}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)", // 배경(오버레이) 색상
        },
        content: {
          backgroundColor: "black", // 모달 창 내부의 배경색
          padding: "20px",
          borderRadius: "10px",
          height: "400px",
          width: "300px",
          position: "fixed",
          left: "50%",
          top: "10%",
          transform: "translateX(-50%)",
        },
      }}
    >
      <div className="react-modal-container">
        {" "}
        <header>
          <div className="react-modal__close-button">
            <button onClick={onCloseProfileEditModal}>x</button>
          </div>
        </header>
        <main>
          <div className="react-modal__profile-img-box">
            <img
              src={user?.profilePicture}
              alt="Profile"
              onClick={handleImageClick} // 이미지 클릭 시 파일 선택창 열기
              style={{ cursor: "pointer" }}
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // 파일 선택창은 보이지 않음
            onChange={handleImageChange} // 파일 선택 시 이미지 변경 처리
            accept="image/*" // 이미지 파일만 허용
          />
        </main>
      </div>
    </ReactModal>
  );
};
export default ProfileEditModal;

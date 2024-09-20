import React from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
interface ProfileEditModalProps {
  isOpen: boolean;
  onCloseProfileEditModal: () => void;
}
const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onCloseProfileEditModal,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
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
            <img src={user?.profilePicture}></img>
          </div>
        </main>
      </div>
    </ReactModal>
  );
};
export default ProfileEditModal;

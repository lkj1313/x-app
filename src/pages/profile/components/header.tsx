import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
interface HeaderProps {
  onToggleOpen: (isOpen: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({ onToggleOpen }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const formattedDate = user!.createdAt.split("T")[0]; // 아이디 생성 시간
  const handleBackClick = () => {
    navigate(-1); // 뒤로 가기 (이전 페이지로 이동)
  };
  return (
    <header className="profile-page__header">
      <div className="header__back-button-container">
        <div
          className="back-button-container__back-button"
          onClick={handleBackClick}
        >
          <IoArrowBackSharp style={{ fontSize: "30px" }} />
        </div>
        <div className="back-button-container__profile-container">
          {user?.nickname}
        </div>
      </div>
      <div className="hedaer__background-container"></div>
      <div className="hedaer__profile-container">
        <div className="profile-container__profile-img-div">
          <div
            className="profile-img-div__profile-picture-container"
            onClick={() => {
              navigate("/photo");
            }}
          >
            <img src={user?.profilePicture}></img>
          </div>
          <button
            className="profile-img-div__setup-button"
            onClick={() => {
              onToggleOpen(true);
            }}
          >
            set up profile
          </button>
        </div>
        <div className="profile-container__profile-detail-div">
          <div className="prfile-detail-div__nickname">{user?.nickname}</div>
          <div>{user?.email}</div>
        </div>
        <div className="profile-container__id-timestamp">
          <CiCalendar /> Joined {formattedDate}
        </div>
      </div>
    </header>
  );
};

export default Header;

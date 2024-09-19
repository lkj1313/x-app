import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="profile-page__container">
      <header className="profile-page__header">
        <div className="header__back-button-container">
          <div className="back-button-container__back-button">
            <IoArrowBackSharp style={{ fontSize: "30px" }} />
          </div>
          <div className="back-button-container__profile-container">
            {user?.nickname}
          </div>
        </div>
        <div className="hedaer__background-container"></div>
        <div className="hedaer__profile-container">
          <div className="profile-container__profile-img-div">
            <img src={user?.profilePicture}></img>
            <button>set up profile</button>
          </div>
          <div className="profile-container__profile-detail-div">
            <div className="prfile-detail-div__nickname">{user?.nickname}</div>
            <div>{user?.email}</div>
          </div>
        </div>
      </header>
    </div>
  );
}

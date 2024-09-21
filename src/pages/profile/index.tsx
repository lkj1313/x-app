import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Post } from "../home";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import ProfileEditModal from "./components/profileEditModal";
import { CiCalendar } from "react-icons/ci";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onCloseProfileEditModal = () => setIsOpen(false);
  const handleBackClick = () => {
    navigate(-1); // 뒤로 가기 (이전 페이지로 이동)
  };
  const formattedDate = user!.createdAt.split("T")[0];
  const fetchUserPosts = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "posts"),
        where("author.userEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setUserPosts(postsData);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserPosts(); // 컴포넌트가 마운트될 때 사용자 글 불러오기
  }, [user]);
  console.log(userPosts);
  return (
    <div className="profile-page__container">
      {isOpen ? (
        <ProfileEditModal
          isOpen={isOpen}
          onCloseProfileEditModal={onCloseProfileEditModal}
        />
      ) : null}
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
                setIsOpen(true);
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
          <div>aaaaaa</div>
        </div>
      </header>
    </div>
  );
}

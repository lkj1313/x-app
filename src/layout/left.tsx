import { IoHomeOutline } from "react-icons/io5";

import { MdOutlineExplore } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";
const Left = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = () => {
    const isLogout = confirm("정말 로그아웃 하시겠습니까?");
    if (isLogout) {
      dispatch(logout());
    } else {
      return;
    }
  };
  return (
    <div className="left-component" style={{ borderRight: "1px solid gray" }}>
      <nav className="left-component__icon-box">
        {" "}
        <div className="left-component__logobutton dark">
          <a href="/">
            <img
              className="left-component__logo"
              src="/X-white_logo.png"
              alt="Logo"
              style={{ width: "40px", height: "40px" }}
            />{" "}
          </a>
        </div>
        <div
          className={`left-component__homebutton dark`}
          onClick={() => {
            navigate("/");
          }}
        >
          <IoHomeOutline style={{ fontSize: "40px" }} />{" "}
          <div className="left-component__home-text">Home</div>
        </div>
        {/* explore버튼 */}
        <div
          className={`left-component__explorebutton dark`}
          onClick={() => {
            navigate("/search");
          }}
        >
          {" "}
          <MdOutlineExplore style={{ fontSize: "40px" }} />{" "}
          <div className="left-component__explore-text">Explore</div>
        </div>
        <div
          className="left-component__logout-container"
          onClick={handleLogout}
        >
          <div className="logout-container__profile-container">
            <img src={user?.profilePicture} />
            <div>
              <div style={{ whiteSpace: "nowrap" }}>{user?.nickname}</div>{" "}
              <div style={{ fontWeight: "bold" }}>LOGOUT</div>
            </div>
          </div>
          <div className="logout-container__logout-button">
            <IoIosLogOut style={{ fontSize: "40px" }} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Left;

import { IoHomeOutline } from "react-icons/io5";

import { MdOutlineExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../store/store";
const Left = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

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
        <div className="left-component_logout-button">
          <img src={user?.profilePicture} />
          <div>
            <div style={{ whiteSpace: "nowrap" }}>{user?.nickname}</div>{" "}
            <div style={{ fontWeight: "bold" }}>LOGOUT</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Left;

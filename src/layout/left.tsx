import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHome, setExplore } from "../store/mainComponentSlice";
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Left = () => {
  const navigate = useNavigate();

  const handleHomeIconClick = () => {
    navigate("/");
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
      </nav>
      {/* 로고 */}
    </div>
  );
};

export default Left;

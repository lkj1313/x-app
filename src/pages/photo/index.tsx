import React from "react";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../../store/store";

const PhotoPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="photo-page-container">
      <img src={user?.profilePicture}></img>
    </div>
  );
};

export default PhotoPage;

import React, { useState, useEffect } from "react";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addPost } from "./utility/postUtils";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("recommend");
  const [textareaContext, setTextareaContext] = useState("");
  const [posts, setPosts] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const autoResizeTextarea = (textarea: HTMLTextAreaElement): void => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const target = e.target as HTMLTextAreaElement;
    setTextareaContext(target.value);
    autoResizeTextarea(target);
  };

  const handlePost = async () => {
    if (textareaContext.trim()) {
      const post = {
        text: textareaContext,
        usernickname: user?.nickname,
        profilePicture: user?.profilePicture,
        userEmail: user?.email,
      };
      await addPost(post);
      setTextareaContext("");
    }
  };
  useEffect(() => {
    const textarea = document.querySelector(
      ".home-page__textarea"
    ) as HTMLTextAreaElement;

    if (textarea) {
      autoResizeTextarea(textarea);
    }
  }, [textareaContext]);

  return (
    <div className="home-page">
      <div className="home-page__tabs">
        <div
          className={`home-page__tab ${
            activeTab === "recommend" ? "home-page__tab--active" : ""
          }`}
          onClick={() => setActiveTab("recommend")}
        >
          For you
        </div>
        <div
          className={`home-page__tab ${
            activeTab === "follow" ? "home-page__tab--active" : ""
          }`}
          onClick={() => setActiveTab("follow")}
        >
          Following
        </div>
      </div>
      <div className="home-page__post">
        <div className="home-page__profile-img-wrapper">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="home-page__profile-img"
          />
        </div>
        <div className="home-page__textarea-wrapper">
          <textarea
            placeholder="What is happening?"
            value={textareaContext}
            onChange={handleTextareaChange}
            rows={3}
            className="home-page__textarea"
          />
          <div className="home-page__controls">
            <CiImageOn className="home-page__controls-icon" size={30} />
            <button className="home-page__controls-button" onClick={handlePost}>
              게시하기
            </button>
          </div>
        </div>
      </div>{" "}
      <div className="home-page__posts">
        {posts.map((post, index) => (
          <div key={index} className="home-page__post-item">
            {post}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

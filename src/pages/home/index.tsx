import React, { useState, useEffect } from "react";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { db } from "../../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import PostItem from "./components/postItem";
import PostList from "./components/postList";

export interface Post {
  id?: string;
  text: string;
  likes: number;
  comments: any[];
  author: {
    username?: string;
    profilePicture?: string;
    userEmail?: string | null;
  };
  createdAt: Timestamp;
}
const HomePage = () => {
  const [activeTab, setActiveTab] = useState("recommend");
  const [textareaContext, setTextareaContext] = useState("");
  const [posts, setPosts] = useState<Post[]>([]); // Post 타입으로 상태 정의
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

      try {
        const docRef = await addDoc(collection(db, "posts"), {
          text: post.text,
          likes: 0,
          comments: [],
          author: {
            username: post.usernickname,
            profilePicture: post.profilePicture,
            userEmail: post.userEmail,
          },
          createdAt: Timestamp.now(),
        });

        // Firestore에 저장된 새로운 게시물을 posts 상태에 추가
        setPosts((prevPosts) => [
          ...prevPosts,
          {
            id: docRef.id,
            text: post.text,
            likes: 0,
            comments: [],
            author: {
              username: post.usernickname,
              profilePicture: post.profilePicture,
              userEmail: post.userEmail,
            },
            createdAt: Timestamp.now(),
          },
        ]);

        setTextareaContext(""); // 텍스트 초기화
      } catch (error) {
        console.error("Error adding document: ", error);
      }
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
            src={user?.profilePicture}
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
      <PostList statePosts={posts} />
    </div>
  );
};

export default HomePage;

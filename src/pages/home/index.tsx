import React, { useCallback, useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  DocumentSnapshot,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastVisibleDoc, setLastVisibleDoc] = useState<DocumentSnapshot | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

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

        setPosts((prevPosts) => [
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
          ...prevPosts, // 새 게시글을 목록 상단에 추가
        ]);

        setTextareaContext(""); // 텍스트 초기화
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const fetchPosts = useCallback(
    async (lastVisibleDoc: DocumentSnapshot | null = null) => {
      const postsCollection = collection(db, "posts");

      const postsQuery = lastVisibleDoc
        ? query(
            postsCollection,
            orderBy("createdAt", "desc"),
            startAfter(lastVisibleDoc),
            limit(10)
          )
        : query(postsCollection, orderBy("createdAt", "desc"), limit(10));

      const postsSnapshot = await getDocs(postsQuery);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, "id">),
      }));

      const lastVisible =
        postsSnapshot.docs.length > 0
          ? postsSnapshot.docs[postsSnapshot.docs.length - 1]
          : null;

      setPosts((prevPosts) => [...prevPosts, ...postsList]);
      setLastVisibleDoc(lastVisible);
      if (!lastVisible) {
        setHasMore(false); // 더 이상 가져올 데이터가 없음을 표시
      }
    },
    []
  );

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts(lastVisibleDoc); // 스크롤이 끝에 도달하면 데이터 추가 로드
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, lastVisibleDoc, fetchPosts]
  );

  useEffect(() => {
    fetchPosts(); // 컴포넌트가 마운트될 때 초기 데이터 로드
  }, [fetchPosts]);

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
      </div>
      <PostList posts={posts} lastPostRef={lastPostRef} loading={loading} />{" "}
      {/* PostList에 posts와 lastPostRef를 전달 */}
    </div>
  );
};

export default HomePage;

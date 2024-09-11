import React, { useCallback, useEffect, useRef, useState } from "react";

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
import PostInput from "./components/postInput";
import Tabs from "./components/tabs";

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

  const handlePost = async (text: string) => {
    if (text.trim()) {
      // context가 공백이 아니라면 실행
      const post = {
        text, // 여기서 text는 PostInput에서 전달된 값입니다.
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
      if (loading || !hasMore) return; // 로딩 중이거나 더 이상 가져올 데이터가 없으면 중단

      if (observerRef.current) observerRef.current.disconnect(); // 기존 관찰 해제

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts(lastVisibleDoc); // 스크롤 끝에 도달하면 데이터 로드
        }
      });

      if (node) observerRef.current.observe(node); // 새로운 노드 관찰 시작
    },
    [loading, hasMore, lastVisibleDoc, fetchPosts]
  );

  useEffect(() => {
    fetchPosts(); // 컴포넌트가 마운트될 때 초기 데이터 로드
  }, []);

  return (
    <div className="home-page">
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <PostInput
        textareaContext={textareaContext}
        onTextareaChange={setTextareaContext}
        onPost={handlePost}
      />
      <PostList posts={posts} lastPostRef={lastPostRef} />{" "}
      {/* PostList에 posts와 lastPostRef를 전달 */}
    </div>
  );
};

export default HomePage;

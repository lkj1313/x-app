import React, { useEffect, useRef, useState } from "react";

import { Timestamp, DocumentSnapshot } from "firebase/firestore";
import PostList from "./components/postList"; // 게시물 목록 컴포넌트
import PostInput from "./components/postInput"; // 게시물 작성 컴포넌트
import Tabs from "./components/tabs"; // 탭 내비게이션 컴포넌트
import { useSelector } from "react-redux";

import { fetchPosts } from "./utility/fetchService";
import { handleLike } from "./utility/likeService";
import { RootState } from "../../store/store";
import { useInfiniteScroll } from "./utility/useInfiniteScroll";

export interface Post {
  id?: string;
  text: string;
  likedBy: string[]; // 좋아요를 누른 사용자들의 ID 목록
  imageUrl?: string | null; // 이미지 URL, 없을 수 있으므로 선택적
  comments: any[];
  author: {
    username?: string;
    profilePicture?: string;
    userEmail?: string | null;
  };
  createdAt: Timestamp;
}

const HomePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  // 현재 활성화된 탭 상태 관리
  const [activeTab, setActiveTab] = useState("recommend");
  // 텍스트 입력 필드 상태 관리
  const [textareaContext, setTextareaContext] = useState("");
  // 게시물 목록 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  // 마지막으로 불러온 문서 상태 (페이징 처리용)
  const [lastVisibleDoc, setLastVisibleDoc] = useState<DocumentSnapshot | null>(
    null
  );
  // 더 불러올 데이터가 있는지 여부
  const [hasMore, setHasMore] = useState(true);
  // IntersectionObserver를 위한 ref 설정

  // 좋아요 처리 함수 호출
  const handlePostLike = (postId: string) => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    handleLike(postId, posts, setPosts, user); // user가 null이 아님을 보장
  };
  // 게시물 불러오기 함수
  const loadMorePosts = async () => {
    if (!hasMore) return; // 더 불러올 데이터가 없으면 중단
    await fetchPosts({
      setPosts,
      setLastVisibleDoc,
      lastVisibleDoc,
      setHasMore,
    });
  };
  const lastPostRef = useInfiniteScroll({
    hasMore,
    fetchPosts: loadMorePosts,
    lastVisibleDoc,
  });
  // 컴포넌트가 마운트될 때 게시물 초기 로드
  useEffect(() => {
    fetchPosts({ setPosts, setLastVisibleDoc, lastVisibleDoc, setHasMore });
  }, []);

  return (
    <div className="home-page">
      {/* 탭 컴포넌트 */}
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      {/* 게시물 작성 컴포넌트 */}
      <PostInput
        textareaContext={textareaContext}
        onTextareaChange={setTextareaContext}
        setPosts={setPosts}
      />
      {/* 게시물 목록 컴포넌트 및 무한 스크롤 처리 */}
      <PostList onLike={handlePostLike} posts={posts} setPosts={setPosts} />
      <div ref={lastPostRef}></div>
    </div>
  );
};

export default HomePage;

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
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";
import PostList from "./components/postList"; // 게시물 목록 컴포넌트
import PostInput from "./components/postInput"; // 게시물 작성 컴포넌트
import Tabs from "./components/tabs"; // 탭 내비게이션 컴포넌트
import { toggleLikeOnPost } from "../../firebase/firebaseService";

export interface Post {
  id?: string;
  text: string;
  likedBy: string[]; // 좋아요를 누른 사용자들의 ID 목록
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
  // 로딩 상태 관리
  const [loading, setLoading] = useState(false);
  // 더 불러올 데이터가 있는지 여부
  const [hasMore, setHasMore] = useState(true);
  // IntersectionObserver를 위한 ref 설정
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Redux에서 사용자 정보 가져오기
  const user = useSelector((state: RootState) => state.auth.user);

  // 게시물 작성 핸들러
  const handlePost = async (text: string) => {
    if (text.trim()) {
      // 공백이 아닌 경우에만 실행
      const post = {
        text, // 입력된 게시물 텍스트
        usernickname: user?.nickname,
        profilePicture: user?.profilePicture,
        userEmail: user?.email,
      };

      try {
        // Firebase Firestore에 새 게시물 추가
        const docRef = await addDoc(collection(db, "posts"), {
          text: post.text,
          likes: 0,
          likedBy: [],
          comments: [],
          author: {
            username: post.usernickname,
            profilePicture: post.profilePicture,
            userEmail: post.userEmail,
          },
          createdAt: Timestamp.now(), // 현재 시간으로 생성 시간 설정
        });

        // 새 게시물을 기존 목록의 상단에 추가
        setPosts((prevPosts) => [
          {
            id: docRef.id,
            text: post.text,
            likes: 0,
            likedBy: [],
            comments: [],
            author: {
              username: post.usernickname,
              profilePicture: post.profilePicture,
              userEmail: post.userEmail,
            },
            createdAt: Timestamp.now(),
          },
          ...prevPosts, // 기존 게시물 목록
        ]);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };
  console.log(posts);
  // 게시물 목록 불러오기 핸들러 (페이징 포함)
  const fetchPosts = useCallback(
    async (lastVisibleDoc: DocumentSnapshot | null = null) => {
      const postsCollection = collection(db, "posts");

      // Firebase Firestore에서 게시물 쿼리
      const postsQuery = lastVisibleDoc
        ? query(
            postsCollection,
            orderBy("createdAt", "desc"), // 생성일 기준 내림차순 정렬
            startAfter(lastVisibleDoc), // 마지막으로 불러온 문서 이후의 데이터만 불러옴
            limit(10) // 한 번에 10개씩만 불러옴
          )
        : query(postsCollection, orderBy("createdAt", "desc"), limit(10));

      // Firestore에서 쿼리 실행
      const postsSnapshot = await getDocs(postsQuery);
      // 불러온 게시물 데이터를 변환하여 배열로 저장
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, "id">), // 데이터와 문서 ID를 조합
      }));

      // 마지막으로 불러온 문서 업데이트
      const lastVisible =
        postsSnapshot.docs.length > 0
          ? postsSnapshot.docs[postsSnapshot.docs.length - 1]
          : null;

      setPosts((prevPosts) => [...prevPosts, ...postsList]); // 기존 게시물에 새 게시물 추가
      setLastVisibleDoc(lastVisible); // 마지막 문서 업데이트
      if (!lastVisible) {
        setHasMore(false); // 더 이상 불러올 데이터가 없음을 표시
      }
    },
    []
  );

  const handleLike = async (postId: string) => {
    // postId가 string 타입이므로, undefined가 아닐 경우만 처리
    if (!postId) return;

    const post = posts.find((post) => post.id === postId); // argument로 온 postId와 post.id가 같은 요소 찾기
    const userHasLiked =
      Array.isArray(post?.likedBy) && post.likedBy.includes(user?.uid || "");

    try {
      // user.uid가 undefined일 수 있으므로, 옵셔널 체이닝으로 처리
      if (!user?.uid) {
        console.error("User is not logged in or has no valid UID.");
        return;
      }

      await toggleLikeOnPost(postId, user.uid, userHasLiked);

      // 상태에서도 좋아요 수 업데이트
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: userHasLiked ? post.likes - 1 : post.likes + 1, // 좋아요 여부에 따라 증가 또는 감소
                likedBy: userHasLiked
                  ? post.likedBy.filter((uid) => uid !== user.uid) // 이미 좋아요를 눌렀다면 유저의 UID 제거
                  : [...post.likedBy, user.uid], // 좋아요를 추가한다면 유저의 UID 추가
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error handling like: ", error);
    }
  };
  // IntersectionObserver를 통한 무한 스크롤 처리
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return; // 로딩 중이거나 더 이상 가져올 데이터가 없으면 중단

      if (observerRef.current) observerRef.current.disconnect(); // 기존 관찰 해제

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts(lastVisibleDoc); // 스크롤 끝에 도달하면 게시물 추가 로드
        }
      });

      if (node) observerRef.current.observe(node); // 새로운 노드 관찰 시작
    },
    [loading, hasMore, lastVisibleDoc, fetchPosts]
  );

  // 컴포넌트가 마운트될 때 게시물 초기 로드
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      {/* 탭 컴포넌트 */}
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      {/* 게시물 작성 컴포넌트 */}
      <PostInput
        textareaContext={textareaContext}
        onTextareaChange={setTextareaContext}
        onPost={handlePost}
      />
      {/* 게시물 목록 컴포넌트 및 무한 스크롤 처리 */}
      <PostList
        posts={posts}
        lastPostRef={lastPostRef}
        handleLike={handleLike}
      />
    </div>
  );
};

export default HomePage;

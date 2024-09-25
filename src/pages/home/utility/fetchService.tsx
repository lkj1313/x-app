import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  startAfter,
  query,
} from "firebase/firestore";

import { Post } from "..";
import { db } from "../../../../firebase";

export const fetchPosts = async ({
  setPosts,
  setLastVisibleDoc,
  lastVisibleDoc,
  setHasMore,
}: {
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  setLastVisibleDoc: React.Dispatch<
    React.SetStateAction<DocumentSnapshot | null>
  >;
  lastVisibleDoc?: DocumentSnapshot | null;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
};

// // IntersectionObserver를 통한 무한 스크롤 처리
// export const lastPostRef = useCallback(
//   (node: HTMLDivElement) => {
//     if (loading || !hasMore) return; // 로딩 중이거나 더 이상 가져올 데이터가 없으면 중단

//     if (observerRef.current) observerRef.current.disconnect(); // 기존 관찰 해제

//     observerRef.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         fetchPosts(lastVisibleDoc); // 스크롤 끝에 도달하면 게시물 추가 로드
//       }
//     });

//     if (node) observerRef.current.observe(node); // 새로운 노드 관찰 시작
//   },
//   [loading, hasMore, lastVisibleDoc, fetchPosts]
// );

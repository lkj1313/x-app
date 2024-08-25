import React, { useCallback, useEffect, useRef, useState } from "react";
import PostItem from "./postItem";
import { Post } from "..";
import { db } from "../../../../firebase";
import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

interface PostListProps {}

const fetchPosts = async (
  lastVisibleDoc: DocumentSnapshot | null = null
): Promise<{ postsList: Post[]; lastVisible: DocumentSnapshot | null }> => {
  const postsCollection = collection(db, "posts");

  // orderBy를 추가하여 createdAt을 기준으로 정렬한 후 데이터를 가져옴
  const postsQuery = lastVisibleDoc
    ? query(
        postsCollection,
        orderBy("createdAt", "desc"),
        startAfter(lastVisibleDoc),
        limit(10)
      ) // 마지막 문서 이후부터 가져오기
    : query(postsCollection, orderBy("createdAt", "desc"), limit(10)); // 처음 가져올 때는 orderBy와 limit만 사용

  const postsSnapshot = await getDocs(postsQuery);
  const postsList = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, "id">),
  }));

  const lastVisible =
    postsSnapshot.docs.length > 0
      ? postsSnapshot.docs[postsSnapshot.docs.length - 1]
      : null;

  return { postsList, lastVisible };
};

const PostList: React.FC<PostListProps> = () => {
  const [dbPosts, setDbPosts] = useState<Post[]>([]);
  const [lastVisibleDoc, setLastVisibleDoc] = useState<DocumentSnapshot | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 확인하는 상태
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return; // 로딩 중이거나 더 가져올 데이터가 없으면 중단
    setLoading(true);
    const { postsList, lastVisible } = await fetchPosts(lastVisibleDoc);
    setDbPosts((prevPosts) => [...prevPosts, ...postsList]);
    setLastVisibleDoc(lastVisible);
    setLoading(false);
    if (!lastVisible) {
      setHasMore(false); // 더 이상 가져올 데이터가 없음을 표시
    }
  }, [lastVisibleDoc]); // 의존성 배열에서 loading과 hasMore를 제거

  useEffect(() => {
    loadPosts();
    console.log("hi");
  }, []); // 한 번만 실행

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return; // 로딩 중이거나 더 이상 가져올 데이터가 없으면 중단
      if (observerRef.current) observerRef.current.disconnect(); // 기존 옵저버 해제

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadPosts(); // 스크롤이 끝에 도달하면 데이터 추가 로드
        }
      });

      if (node) observerRef.current.observe(node); // 새로운 요소 관찰 시작
    },
    [loading, hasMore, loadPosts]
  );

  return (
    <div className="home-page__posts">
      {dbPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <div ref={lastPostRef}></div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PostList;

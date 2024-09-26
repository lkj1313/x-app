import { useRef } from "react";

interface InfiniteScrollOptions {
  hasMore: boolean;
  fetchPosts: () => void;
  lastVisibleDoc: any; // Firestore에서 가져온 DocumentSnapshot 타입을 사용할 수 있습니다
}

export const useInfiniteScroll = ({
  hasMore,
  fetchPosts,
  lastVisibleDoc,
}: InfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastPostRef = (node: HTMLDivElement | null) => {
    if (!hasMore) return; // 더 이상 가져올 데이터가 없으면 중단

    if (observerRef.current) observerRef.current.disconnect(); // 기존 관찰 해제

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchPosts(); // 스크롤 끝에 도달하면 게시물 추가 로드
      }
    });

    if (node) observerRef.current.observe(node); // 새로운 노드 관찰 시작
  };

  return lastPostRef; // ref 콜백 반환
};

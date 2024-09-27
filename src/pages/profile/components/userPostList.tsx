import React, { useEffect, useRef, useState } from "react";
import { useFetchUserPostMutation } from "../utility/useFetchUserPostMutation";
import { Post } from "../../home";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import UserPostItem from "./userPostItem";

const UserPostList = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [lastPost, setLastPost] = useState<Post | undefined>(undefined); // 마지막 포스트 상태
  const { mutate: useFetchUserPosts, isPending } = useFetchUserPostMutation({
    setUserPosts,
  });
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (user) {
      useFetchUserPosts({ user, lastPost: undefined }); // 첫 로딩 시 lastPost 없이 데이터 가져옴
    }
  }, [user]);
  useEffect(() => {
    if (isPending) return; // 로딩 중에는 새로운 요청 하지 않음

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isPending && user) {
        // 마지막 게시물이 화면에 보이면 데이터 요청
        useFetchUserPosts({ user, lastPost });
      }
    });

    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }
  }, [userPosts, lastPost, isPending]);

  return (
    <div className="home-page__posts">
      {userPosts.map((post, index) => {
        return <UserPostItem post={post} />;
      })}
      <div ref={lastPostElementRef} />
    </div>
  );
};

export default UserPostList;

import React from "react";
import PostItem from "./postItem";
import { Post } from "..";
import { useEffect } from "react";

interface PostListProps {
  posts: Post[];
  onLike: (postId: string) => void; // 좋아요 클릭 시 호출될 함수
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostList: React.FC<PostListProps> = ({ onLike, posts }) => {
  useEffect(() => {
    console.log("Updated posts in PostList:", posts);
  }, [posts]);
  return (
    <div className="home-page__posts">
      {posts.map((post, index) => {
        // 마지막 게시글에만 lastPostRef를 전달

        return <PostItem key={post.id} post={post} onLike={onLike} />;
      })}
    </div>
  );
};

export default PostList;

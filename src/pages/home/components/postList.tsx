import React from "react";
import PostItem from "./postItem";
import { Post } from "..";
import { useEffect } from "react";

interface PostListProps {
  posts: Post[];
  lastPostRef: (node: HTMLDivElement) => void;
  handleLike: (postId: string) => Promise<void>; // handleLike 타입 추가
}

const PostList: React.FC<PostListProps> = ({
  posts,
  lastPostRef,
  handleLike,
}) => {
  useEffect(() => {
    console.log("Updated posts in PostList:", posts);
  }, [posts]);
  return (
    <div className="home-page__posts">
      {posts.map((post, index) => {
        // 마지막 게시글에만 lastPostRef를 전달
        const isLastPost = index === posts.length - 1;
        return (
          <PostItem
            key={post.id}
            post={post}
            ref={isLastPost ? lastPostRef : null}
            handleLike={handleLike} // 마지막 게시글에 ref 전달
          />
        );
      })}
    </div>
  );
};

export default PostList;

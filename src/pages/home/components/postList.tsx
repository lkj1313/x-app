import React from "react";
import PostItem from "./postItem";
import { Post } from "..";
import { useEffect } from "react";

interface PostListProps {
  // lastPostRef: (node: HTMLDivElement) => void;
  posts: Post[];
  onLike: (postId: string) => void; // 좋아요 클릭 시 호출될 함수
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostList: React.FC<PostListProps> = ({
  onLike,
  // lastPostRef,
  posts,
  setPosts,
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
            // ref={isLastPost ? lastPostRef : null}
            onLike={onLike}
          />
        );
      })}
    </div>
  );
};

export default PostList;

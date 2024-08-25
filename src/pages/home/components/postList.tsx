import React from "react";
import PostItem from "./postItem";
import { Post } from "..";

interface PostListProps {
  posts: Post[];
  lastPostRef: (node: HTMLDivElement) => void;
  loading: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, lastPostRef, loading }) => {
  return (
    <div className="home-page__posts">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <div ref={lastPostRef} style={{ height: "1px" }}></div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PostList;

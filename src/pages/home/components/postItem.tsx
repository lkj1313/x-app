import React, { forwardRef } from "react";
import { Post } from "..";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";

interface PostItemProps {
  post: Post;
  handleLike: (postId: string) => void; // handleLike 추가
}

const PostItem = forwardRef<HTMLDivElement, PostItemProps>(
  ({ post, handleLike }, ref) => (
    <div className="home-page__post-item" ref={ref}>
      <div className="home-page__post-author">
        <img
          src={post.author.profilePicture}
          alt={post.author.username}
          className="home-page__post-author-image"
        />
      </div>
      <div className="home-page__post-content">
        <div className="home-page__post-header">
          <span className="home-page__post-author-name">
            {post.author.username}
          </span>
          <p>{post.text}</p>
        </div>
        <div className="home-page__post-footer">
          <div
            className="home-page__post-likes"
            style={{ display: "flex" }}
            onClick={() => post.id && handleLike(post.id)}
          >
            <FaRegHeart />
            {post.likedBy.length}

            <div></div>
          </div>
          <div className="home-page__post-comments">
            <FaRegComment />
            {post.comments.length}
          </div>
        </div>
      </div>
    </div>
  )
);

export default PostItem;

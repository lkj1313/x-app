import React, { forwardRef } from "react";
import { Post } from "..";

interface PostItemProps {
  post: Post;
}

const PostItem = forwardRef<HTMLDivElement, PostItemProps>(({ post }, ref) => (
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
        <span className="home-page__post-likes">Likes: {post.likes}</span>
        <span className="home-page__post-comments">
          Comments: {post.comments.length}
        </span>
      </div>
    </div>
  </div>
));

export default PostItem;

import React from "react";
import { Post } from "../../home";
import { FaRegComment, FaRegHeart } from "react-icons/fa6";

interface UserPostItemProps {
  post: Post;
}
const UserPostItem: React.FC<UserPostItemProps> = ({ post }) => {
  return (
    <div className="home-page__post-item">
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

          <div className="home-page__post-text">{post.text}</div>

          <img style={{ width: "100%" }} src={post.imageUrl ?? undefined}></img>
        </div>
        <div className="home-page__post-footer">
          <div
            className="home-page__post-likes"
            style={{ display: "flex" }}
            onClick={() => post.id}
          >
            <FaRegHeart />
            {post.likedBy.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostItem;

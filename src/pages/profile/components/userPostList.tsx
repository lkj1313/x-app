import React, { useEffect, useState } from "react";
import { useFetchUserPostMutation } from "../utility/useFetchUserPostMutation";
import { Post } from "../../home";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import UserPostItem from "./userPostItem";

const UserPostList = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const { mutate: useFetchUserPosts, isPending } = useFetchUserPostMutation({
    setUserPosts,
  });
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (user) {
      useFetchUserPosts(user);
    }
    console.log(userPosts);
  }, []);

  return (
    <div className="home-page__posts">
      {userPosts.map((post, index) => {
        return <UserPostItem post={post} />;
      })}
    </div>
  );
};

export default UserPostList;

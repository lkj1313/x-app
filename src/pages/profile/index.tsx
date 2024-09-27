import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Post } from "../home";
import { useEffect, useState } from "react";

import ProfileEditModal from "./components/profileEditModal";

import { useFetchUserPostMutation } from "./utility/useFetchUserPostMutation";
import Header from "./components/header";
import Main from "./components/main";
import Tabs from "./components/tabs";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState("posts");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onCloseProfileEditModal = () => setIsOpen(false);

  const { mutate: useFetchUserPosts, isPending } = useFetchUserPostMutation({
    setUserPosts,
  });

  useEffect(() => {
    if (user) {
      useFetchUserPosts(user);
    }
    console.log(userPosts);
  }, []);

  return (
    <div className="profile-page__container">
      {isOpen ? (
        <ProfileEditModal
          isOpen={isOpen}
          onCloseProfileEditModal={onCloseProfileEditModal}
        />
      ) : null}
      <Header onToggleOpen={setIsOpen} />
      <Main currentTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

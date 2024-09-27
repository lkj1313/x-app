import { useState } from "react";

import ProfileEditModal from "./components/profileEditModal";

import Header from "./components/header";
import Main from "./components/main";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onCloseProfileEditModal = () => setIsOpen(false);

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

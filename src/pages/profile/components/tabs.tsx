import React from "react";
interface TabsProps {
  currentTab: string;
  onTabChange: (newTab: string) => void;
}
const Tabs: React.FC<TabsProps> = ({ currentTab, onTabChange }) => {
  return (
    <div className="profile-page__tabs">
      <div
        className={`profile-page__tab ${
          currentTab === "recommend" ? "profile-page__tab--active" : ""
        }`}
        onClick={() => onTabChange("recommend")}
      >
        Posts
      </div>
      <div
        className={`profile-page__tab ${
          currentTab === "follow" ? "profile-page__tab--active" : ""
        }`}
        onClick={() => onTabChange("follow")}
      >
        Likes
      </div>
    </div>
  );
};

export default Tabs;

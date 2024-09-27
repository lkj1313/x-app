import React from "react";
import Tabs from "./tabs";
import UserPostList from "./userPostList";
interface MainProps {
  currentTab: string;
  onTabChange: (newTab: string) => void;
}
const main: React.FC<MainProps> = ({ currentTab, onTabChange }) => {
  return (
    <div>
      <header>
        <Tabs currentTab={currentTab} onTabChange={onTabChange} />
      </header>
      <main>
        <UserPostList />
      </main>
    </div>
  );
};

export default main;

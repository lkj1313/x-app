import React from "react";
import Tabs from "./tabs";
interface MainProps {
  currentTab: string;
  onTabChange: (newTab: string) => void;
}
const main: React.FC<MainProps> = ({ currentTab, onTabChange }) => {
  return (
    <div>
      <Tabs currentTab={currentTab} onTabChange={onTabChange} />
    </div>
  );
};

export default main;

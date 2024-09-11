// Tabs.tsx
interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  return (
    <div className="home-page__tabs">
      <div
        className={`home-page__tab ${
          activeTab === "recommend" ? "home-page__tab--active" : ""
        }`}
        onClick={() => onTabChange("recommend")}
      >
        For you
      </div>
      <div
        className={`home-page__tab ${
          activeTab === "follow" ? "home-page__tab--active" : ""
        }`}
        onClick={() => onTabChange("follow")}
      >
        Following
      </div>
    </div>
  );
};

export default Tabs;

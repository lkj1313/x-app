import { ReactNode } from "react";
import Left from "./left";
import Right from "./right";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Left />
      {children}
      <Right />
    </div>
  );
};

export default Layout;

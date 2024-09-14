import { ReactNode } from "react";
import Left from "./left";
import Right from "./right";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-container">
      <Left />
      <Outlet />
      <Right />
    </div>
  );
};

export default Layout;

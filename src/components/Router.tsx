import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import Loading from "./loading";

const Router = () => {
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000); // 2초 후에 로딩 완료로 설정 (원하는 시간으로 변경 가능)
  //   }
  // }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/posts" element={<h1>Home page</h1>}></Route>
      <Route path="/posts/:id" element={<h1>Home page</h1>}></Route>
      <Route path="/posts/new" element={<h1>Home page</h1>}></Route>
      <Route path="/posts/edit" element={<h1>Home page</h1>}></Route>
      <Route path="/posts/profile" element={<h1>Home page</h1>}></Route>
      <Route path="/posts/profile/edit" element={<h1>Home page</h1>}></Route>
      <Route path="/notificataion" element={<h1>Home page</h1>}></Route>
      <Route path="/search" element={<h1>Home page</h1>}></Route>
      <Route path="/users/login" element={<LoginPage />}></Route>
      <Route path="/users/signup" element={<h1>Home page</h1>}></Route>
      <Route path="*" element={<Navigate replace to="/" />}>
        {" "}
      </Route>
    </Routes>
  );
};

export default Router;

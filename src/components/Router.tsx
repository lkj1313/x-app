import HomePage from "../pages/home";

import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login";

const Router = () => {
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

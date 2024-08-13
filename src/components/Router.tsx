import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import Layout from "./Layout";
import SearchPage from "../pages/search";

const pageTransition = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/posts"
          element={
            <Layout>
              <h1>Home page</h1>
            </Layout>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <Layout>
              <h1>Home page</h1>
            </Layout>
          }
        />
        <Route
          path="/posts/new"
          element={
            <Layout>
              <h1>Home page</h1>
            </Layout>
          }
        />
        <Route
          path="/posts/edit"
          element={
            <Layout>
              <h1>Home page</h1>
            </Layout>
          }
        />
        <Route
          path="/posts/profile"
          element={
            <Layout>
              <h1>Home page</h1>
            </Layout>
          }
        />
        <Route
          path="/posts/profile/edit"
          element={
            <Layout>
              <h1>Home page</h1>
            </Layout>
          }
        />
        <Route
          path="/notificataion"
          element={
            <Layout>
              <h1>Home page</h1>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <SearchPage />
            </Layout>
          }
        />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

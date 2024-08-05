import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<h1>Home page</h1>} />
        <Route path="/posts/:id" element={<h1>Home page</h1>} />
        <Route path="/posts/new" element={<h1>Home page</h1>} />
        <Route path="/posts/edit" element={<h1>Home page</h1>} />
        <Route path="/posts/profile" element={<h1>Home page</h1>} />
        <Route path="/posts/profile/edit" element={<h1>Home page</h1>} />
        <Route path="/notificataion" element={<h1>Home page</h1>} />
        <Route path="/search" element={<h1>Home page</h1>} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

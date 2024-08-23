import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import Layout from "../layout/Layout";
import SearchPage from "../pages/search";

const AnimatedRoutes = () => {
  const location = useLocation();

  return <AnimatePresence></AnimatePresence>;
};

export default AnimatedRoutes;

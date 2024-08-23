import Router from "./components/Router";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import LoginPage from "./pages/login";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // 로컬 스토리지에서 로그인 정보 확인
  const isLoggedIn = !!localStorage.getItem("user");

  // 로그인 상태를 확인하고, 로그인되지 않은 경우 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/users/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

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
        {/* Layout이 필요 없는 경로들 */}
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />

        {/* Layout이 필요한 경로들 */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<h1>Posts 페이지</h1>} />
          <Route path="/posts/:id" element={<h1>Post 상세 페이지</h1>} />
          <Route path="/posts/new" element={<h1>새 Post 페이지</h1>} />
          <Route path="/posts/edit" element={<h1>Post 수정 페이지</h1>} />
          <Route path="/posts/profile" element={<h1>프로필 페이지</h1>} />
          <Route
            path="/posts/profile/edit"
            element={<h1>프로필 수정 페이지</h1>}
          />
          <Route path="/notification" element={<h1>알림 페이지</h1>} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;

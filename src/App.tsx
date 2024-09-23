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
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import store from "./store/store";
import { Provider } from "react-redux";
import ProfilePage from "./pages/profile";
import PhotoPage from "./pages/photo";
function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // 로컬 스토리지에서 로그인 정보 확인
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // 로그인 상태를 확인하고, 로그인되지 않은 경우 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/users/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes location={location} key={location.pathname}>
      {/* Layout이 필요 없는 경로들 */}
      <Route path="/users/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/photo" element={<PhotoPage />} />
      {/* Layout이 필요한 경로들 */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/posts/profile/edit"
          element={<h1>프로필 수정 페이지</h1>}
        />

        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;

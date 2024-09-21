import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";
import Cookies from "js-cookie"; // js-cookie 라이브러리 import

export interface User {
  email: string | null;
  uid: string;
  nickname?: string;
  profilePicture?: string;
  createdAt: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

// 쿠키에서 초기 상태를 가져옴
const initialState: AuthState = {
  isLoggedIn: !!Cookies.get("user"), // 쿠키에 유저 정보가 있으면 true
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
      // 쿠키에 유저 정보를 저장 (유효기간 1시간)
      Cookies.set("user", JSON.stringify(action.payload), { expires: 1 });
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      // 쿠키에서 유저 정보를 삭제
      Cookies.remove("user");
    },
    updateProfilePicture(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.profilePicture = action.payload;
        // 쿠키에도 업데이트된 프로필 사진 반영
        Cookies.set("user", JSON.stringify(state.user), { expires: 1 });
      }
    },
  },
});

export const { login, logout, updateProfilePicture } = authSlice.actions;
export default authSlice.reducer;

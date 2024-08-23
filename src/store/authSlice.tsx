import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string | null;
  uid: string;
  nickname?: string;
  profilePicture?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem("user"), // 로컬 스토리지에 유저 정보가 있으면 true
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // 로컬 스토리지에 유저 정보 저장
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user"); // 로컬 스토리지에서 유저 정보 제거
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

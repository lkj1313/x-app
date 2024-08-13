import { createSlice } from "@reduxjs/toolkit";

// Slice 생성
const mainComponentSlice = createSlice({
  name: "mainComponentSlice",
  initialState: "home",
  reducers: {
    // 상태를 'home'으로 변경하는 리듀서
    setHome: (state) => {
      return "home";
    },
    // 상태를 'profile'로 변경하는 리듀서
    setProfile: (state) => {
      return "profile";
    },
    setExplore: (state) => {
      return "explore";
    },
  },
});

// 액션 생성자(export)
export const { setHome, setProfile, setExplore } = mainComponentSlice.actions;

// 리듀서 export
export default mainComponentSlice.reducer;

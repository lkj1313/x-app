import { useEffect } from "react";

const useViewportHeight = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01; // window.innerHeight를 이용해 1vh를 계산
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);

    // 초기 설정
    setViewportHeight();

    return () => {
      window.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
    };
  }, []);
};

export default useViewportHeight;

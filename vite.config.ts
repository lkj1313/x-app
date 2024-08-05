import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@firebaseApp": "/src/firebaseApp",
    },
  },
  server: {
    proxy: {
      "/login": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, "/login"),
      },
    },
  },
});

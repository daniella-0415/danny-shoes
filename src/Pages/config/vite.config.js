import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/signup": "http://54.82.9.35:3000",
      "/signin": "http://54.82.9.35:3000",
    },
  },
});

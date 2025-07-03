import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // ✅ Essential for React SPA: ensures deep links like /admin/login don't 404
  appType: "spa",

  server: {
    host: "::",
    port: 8080,
    fs: {
      strict: true,
    },
    // `historyApiFallback` is built-in with appType: 'spa', no need to specify separately
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

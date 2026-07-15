import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, // Error overlay বন্ধ করতে (ঐচ্ছিক)
    },
  },
});

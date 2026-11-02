import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative asset paths so the site works on any GitHub Pages URL.
export default defineConfig({
  plugins: [react()],
  base: "./",
});

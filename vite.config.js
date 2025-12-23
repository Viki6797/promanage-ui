import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  // Prevent Storybook or Vitest from interfering with build
  optimizeDeps: {
    exclude: ["@storybook", "@storybook/addon-vitest"],
  },
  build: {
    rollupOptions: {
      external: [], // no storybook plugins loaded
    },
  },
});

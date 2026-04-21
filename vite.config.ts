import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
// import { viteSingleFile } from "vite-plugin-singlefile";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  // plugins: [tailwindcss(), react(), viteSingleFile()],

  // base must end with '/'
  base: "./",
});

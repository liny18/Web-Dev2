import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://liny18.eastus.cloudapp.azure.com/node/",
      },
    },
  },
  plugins: [react()],
  base: './'
})
import devServer from "@hono/vite-dev-server"
import path from "path"
const __dirname = import.meta.dirname
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

export default defineConfig({
  plugins: [
    devServer({ entry: "api/boot.ts", exclude: [/^\/(?!api\/).*$/] }),
    inspectAttr(), react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@contracts": path.resolve(__dirname, "./contracts"),
      "@db": path.resolve(__dirname, "./db"),
      "db": path.resolve(__dirname, "./db"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-leaflet": ["leaflet", "react-leaflet"],
          "vendor-lucide": ["lucide-react"],
          "data-rulers": ["./src/data/rulers.ts"],
          "data-dynasties": ["./src/data/dynasties.ts"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: true,
  },
  envDir: path.resolve(__dirname),
});

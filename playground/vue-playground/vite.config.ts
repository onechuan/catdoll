import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port: 9001,
    host:"0.0.0.0"
  },
  build:{
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions:{}
  },
  resolve:{
    alias:{
      "@": "/src"
    }
  },
  css:{
    preprocessorOptions: {
      scss: {
      }
    }
  }
})

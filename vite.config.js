import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@sections': path.resolve(__dirname, './src/components/sections')
    }
  },
  // Cấu hình server để hỗ trợ client-side routing
  server: {
    historyApiFallback: true,
  },
  // Cấu hình preview server (production build)
  preview: {
    historyApiFallback: true,
  }
})

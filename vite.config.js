import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 只能是绝对路径
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  assetsInclude: ["**/*.glb","**/*.png"]
})

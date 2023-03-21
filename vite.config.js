import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 只能是绝对路径
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@': path.resolve(__dirname, './src')

      '@': resolve(__dirname, './src')
    }
  },
  assetsInclude: ['**/*.glb', '**/*.png'],
  base: '/three-react/'
})

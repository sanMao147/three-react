import terser from '@rollup/plugin-terser'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
// import { autoComplete, Plugin as importToCDN } from 'vite-plugin-cdn-import'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      viteCompression({
        verbose: true, //是否在控制台输出压缩结果
        disable: false, //是否禁用,相当于开关在这里
        threshold: 10240, //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
        algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.gz' //文件后缀
      }),
      // importToCDN({
      //   prodUrl: 'https://unpkg.com/{name}@{version}/{path}',
      //   modules: [
      //     autoComplete('react'),
      //     autoComplete('react-dom'),
      //     {
      //       name: 'three',
      //       version: '0.150.1',
      //       path: 'build/three.js'
      //     }
      //   ]
      // }),

      visualizer({
        emitFile: false,
        file: 'stats.html', //分析图生成的文件名
        open: true //如果存在本地服务端口，将在打包后自动展示
      })
    ],
    resolve: {
      alias: {
        // 只能是绝对路径
        '@': fileURLToPath(new URL('./src', import.meta.url))
        // '@': path.resolve(__dirname, './src')

        // '@': resolve(__dirname, './src')
      }
    },
    assetsInclude: ['**/*.glb', '**/*.FBX', '**/*.png'],
    base: '/three-react/',
    build: {
      outDir: 'dist', //输出目录名
      minify: 'terser', //压缩方式
      terserOptions: {
        compress: {
          drop_console: true, //剔除console,和debugger
          drop_debugger: true
        }
      },
      // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
      rollupOptions: {
        plugins: [terser()],
        output: {
          //静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          }
        }
      }
    }
  }
})

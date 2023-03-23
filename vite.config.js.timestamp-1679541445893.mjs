// vite.config.js
import terser from "file:///D:/project/react/three-react/node_modules/@rollup/plugin-terser/dist/es/index.js";
import react from "file:///D:/project/react/three-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { visualizer } from "file:///D:/project/react/three-react/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { defineConfig } from "file:///D:/project/react/three-react/node_modules/vite/dist/node/index.js";
import viteCompression from "file:///D:/project/react/three-react/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\project\\react\\three-react";
var vite_config_default = defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      viteCompression({
        verbose: true,
        //是否在控制台输出压缩结果
        disable: false,
        //是否禁用,相当于开关在这里
        threshold: 10240,
        //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
        algorithm: "gzip",
        //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: ".gz"
        //文件后缀
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
        file: "stats.html",
        //分析图生成的文件名
        open: true
        //如果存在本地服务端口，将在打包后自动展示
      })
    ],
    resolve: {
      alias: {
        // 只能是绝对路径
        // '@': fileURLToPath(new URL('./src', import.meta.url)),
        // '@': path.resolve(__dirname, './src')
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    assetsInclude: ["**/*.glb", "**/*.png"],
    base: "/three-react/",
    build: {
      outDir: "dist",
      //输出目录名
      minify: "terser",
      //压缩方式
      terserOptions: {
        compress: {
          drop_console: true,
          //剔除console,和debugger
          drop_debugger: true
        }
      },
      // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
      rollupOptions: {
        plugins: [terser()],
        output: {
          //静态资源分类打包
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHJlYWN0XFxcXHRocmVlLXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHJlYWN0XFxcXHRocmVlLXJlYWN0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3JlYWN0L3RocmVlLXJlYWN0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHRlcnNlciBmcm9tICdAcm9sbHVwL3BsdWdpbi10ZXJzZXInXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuLy8gaW1wb3J0IHsgYXV0b0NvbXBsZXRlLCBQbHVnaW4gYXMgaW1wb3J0VG9DRE4gfSBmcm9tICd2aXRlLXBsdWdpbi1jZG4taW1wb3J0J1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgdml0ZUNvbXByZXNzaW9uKHtcbiAgICAgICAgdmVyYm9zZTogdHJ1ZSwgLy9cdTY2MkZcdTU0MjZcdTU3MjhcdTYzQTdcdTUyMzZcdTUzRjBcdThGOTNcdTUxRkFcdTUzOEJcdTdGMjlcdTdFRDNcdTY3OUNcbiAgICAgICAgZGlzYWJsZTogZmFsc2UsIC8vXHU2NjJGXHU1NDI2XHU3OTgxXHU3NTI4LFx1NzZGOFx1NUY1M1x1NEU4RVx1NUYwMFx1NTE3M1x1NTcyOFx1OEZEOVx1OTFDQ1xuICAgICAgICB0aHJlc2hvbGQ6IDEwMjQwLCAvL1x1NEY1M1x1NzlFRlx1NTkyN1x1NEU4RSB0aHJlc2hvbGQgXHU2MjREXHU0RjFBXHU4OEFCXHU1MzhCXHU3RjI5LFx1NTM1NVx1NEY0RCBiXHVGRjBDMWI9OEIsIDFCPTEwMjRLQiAgXHU5MEEzXHU2MjExXHU0RUVDXHU4RkQ5XHU5MUNDXHU3NkY4XHU1RjUzXHU0RThFIDlrYlx1NTkxQVx1NTQyN1x1RkYwQ1x1NUMzMVx1NEYxQVx1NTM4Qlx1N0YyOVxuICAgICAgICBhbGdvcml0aG06ICdnemlwJywgLy9cdTUzOEJcdTdGMjlcdTdCOTdcdTZDRDUsXHU1M0VGXHU5MDA5IFsgJ2d6aXAnICwgJ2Jyb3RsaUNvbXByZXNzJyAsJ2RlZmxhdGUnICwgJ2RlZmxhdGVSYXcnXVxuICAgICAgICBleHQ6ICcuZ3onIC8vXHU2NTg3XHU0RUY2XHU1NDBFXHU3RjAwXG4gICAgICB9KSxcbiAgICAgIC8vIGltcG9ydFRvQ0ROKHtcbiAgICAgIC8vICAgcHJvZFVybDogJ2h0dHBzOi8vdW5wa2cuY29tL3tuYW1lfUB7dmVyc2lvbn0ve3BhdGh9JyxcbiAgICAgIC8vICAgbW9kdWxlczogW1xuICAgICAgLy8gICAgIGF1dG9Db21wbGV0ZSgncmVhY3QnKSxcbiAgICAgIC8vICAgICBhdXRvQ29tcGxldGUoJ3JlYWN0LWRvbScpLFxuICAgICAgLy8gICAgIHtcbiAgICAgIC8vICAgICAgIG5hbWU6ICd0aHJlZScsXG4gICAgICAvLyAgICAgICB2ZXJzaW9uOiAnMC4xNTAuMScsXG4gICAgICAvLyAgICAgICBwYXRoOiAnYnVpbGQvdGhyZWUuanMnXG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICBdXG4gICAgICAvLyB9KSxcblxuICAgICAgdmlzdWFsaXplcih7XG4gICAgICAgIGVtaXRGaWxlOiBmYWxzZSxcbiAgICAgICAgZmlsZTogJ3N0YXRzLmh0bWwnLCAvL1x1NTIwNlx1Njc5MFx1NTZGRVx1NzUxRlx1NjIxMFx1NzY4NFx1NjU4N1x1NEVGNlx1NTQwRFxuICAgICAgICBvcGVuOiB0cnVlIC8vXHU1OTgyXHU2NzlDXHU1QjU4XHU1NzI4XHU2NzJDXHU1NzMwXHU2NzBEXHU1MkExXHU3QUVGXHU1M0UzXHVGRjBDXHU1QzA2XHU1NzI4XHU2MjUzXHU1MzA1XHU1NDBFXHU4MUVBXHU1MkE4XHU1QzU1XHU3OTNBXG4gICAgICB9KVxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgLy8gXHU1M0VBXHU4MEZEXHU2NjJGXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XG4gICAgICAgIC8vICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAvLyAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG5cbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5nbGInLCAnKiovKi5wbmcnXSxcbiAgICBiYXNlOiAnL3RocmVlLXJlYWN0LycsXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogJ2Rpc3QnLCAvL1x1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVx1NTQwRFxuICAgICAgbWluaWZ5OiAndGVyc2VyJywgLy9cdTUzOEJcdTdGMjlcdTY1QjlcdTVGMEZcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsIC8vXHU1MjU0XHU5NjY0Y29uc29sZSxcdTU0OENkZWJ1Z2dlclxuICAgICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTUwMCxcdTU5MjdcdTY1ODdcdTRFRjZcdTYyQTVcdThCNjZcdTk2MDhcdTUwM0NcdThCQkVcdTdGNkUsXHU0RTBEXHU1RUZBXHU4QkFFXHU0RjdGXHU3NTI4XG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIHBsdWdpbnM6IFt0ZXJzZXIoKV0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8vXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU1MjA2XHU3QzdCXHU2MjUzXHU1MzA1XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdzdGF0aWMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScsXG4gICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgICAvL1x1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NTIwNlx1NjJDNlx1NjI1M1x1NTMwNVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gaWRcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcvJylbMF1cbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFEsT0FBTyxZQUFZO0FBQ2pTLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxvQkFBb0I7QUFFN0IsT0FBTyxxQkFBcUI7QUFONUIsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxRQUFRLE1BQU07QUFDM0MsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sZ0JBQWdCO0FBQUEsUUFDZCxTQUFTO0FBQUE7QUFBQSxRQUNULFNBQVM7QUFBQTtBQUFBLFFBQ1QsV0FBVztBQUFBO0FBQUEsUUFDWCxXQUFXO0FBQUE7QUFBQSxRQUNYLEtBQUs7QUFBQTtBQUFBLE1BQ1AsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BY0QsV0FBVztBQUFBLFFBQ1QsVUFBVTtBQUFBLFFBQ1YsTUFBTTtBQUFBO0FBQUEsUUFDTixNQUFNO0FBQUE7QUFBQSxNQUNSLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFLTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ2pDO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZSxDQUFDLFlBQVksVUFBVTtBQUFBLElBQ3RDLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQTtBQUFBLE1BQ1IsUUFBUTtBQUFBO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDYixVQUFVO0FBQUEsVUFDUixjQUFjO0FBQUE7QUFBQSxVQUNkLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQTtBQUFBLE1BRUEsZUFBZTtBQUFBLFFBQ2IsU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUFBLFFBQ2xCLFFBQVE7QUFBQTtBQUFBLFVBRU4sZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsYUFBYSxJQUFJO0FBRWYsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixxQkFBTyxHQUNKLFNBQVMsRUFDVCxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFDWixTQUFTO0FBQUEsWUFDZDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

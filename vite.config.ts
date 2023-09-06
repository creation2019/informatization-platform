import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// 配置@别名
import { resolve } from "path"
const pathSrc = resolve(__dirname, "./src")

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir)
}

// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// svg图标
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

import DefineOptions from "unplugin-vue-define-options/vite"
import { viteCommonjs } from "@originjs/vite-plugin-commonjs"
import viteCompression from "vite-plugin-compression"

export default defineConfig({
  plugins: [
    vue(),
    //element按需导入
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/auto-import.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), "./src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),

    DefineOptions(),
    viteCommonjs(), // 构建压缩文件
    viteCompression({
      // 记录压缩文件及其压缩率。默认true
      verbose: true,
      // 是否启用压缩，默认false
      disable: false,
      // 需要使用压缩前的最小文件大小，单位字节（byte） b，1b(字节)=8bit(比特), 1KB=1024B
      threshold: 10240, // 即10kb以上即会压缩
      // 压缩算法 可选 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw'
      algorithm: "gzip",
      // 压缩后的文件格式
      ext: ".gz",
    }),
  ],
  base: "./",
  resolve: {
    // ↓路径别名
    alias: {
      "@": pathSrc,
    },
  },
  // 服务端渲染
  server: {
    // 是否开启 https
    https: false,
    // 端口号
    port: 8956,
    host: "0.0.0.0",
    // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
    proxy: {},
  },
  build: {
    sourcemap: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      input: {
        index: pathResolve("index.html"),
      },
      // 静态资源分类打包
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
})

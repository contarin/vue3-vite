import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue'
import path from 'path';
const resolve = (dir) => path.resolve(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './src/mock/', // 设置模拟数据的存储文件夹
      supportTs: true, // 是否读取ts文件模块
      localEnabled: true, //设置是否启用本地mock文件
    })
  ],
  base: './', // 这里更改打包相对绝对路径
  minify: true, // 是否压缩代码
  sourceMap: true, // 是否生成sourceMap
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
})

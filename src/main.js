import { createApp } from 'vue'
import './common.css'
import './permission';   // 路由守卫
import router from '@/router';
import App from './App.vue'
import { store } from '@/store/index';
import '@/mock/index'; // mock数据
// 全局注册 ant-design-vue 组件库
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import moment from 'moment'
// 全局注册 moment.js 日期处理插件
import 'moment/locale/zh-cn'
moment.locale('zh-cn');
// 全局注入 ant-design-vue 组件库的图标
import * as Icons from '@ant-design/icons-vue';
const app = createApp(App);
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key]);
});
app.use(router);
app.use(store);
app.use(Antd).mount('#app');

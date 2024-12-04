import { createApp } from 'vue'
import WebMonitorSdk from "@catdoll/monitor-sdk";
import './style.css'
import App from './App.vue'



const app =createApp(App)
app.use(WebMonitorSdk,{
  url:"http://127.0.0.1:3000/reportData",
})
app.mount('#app')

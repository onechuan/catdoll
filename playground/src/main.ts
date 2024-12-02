import { createApp } from 'vue'
import WebMonitorSdk from "@catdoll/monitor-sdk";
import './style.css'
import App from './App.vue'

WebMonitorSdk.install()

const app =createApp(App)
app.mount('#app')

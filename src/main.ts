import { createApp } from "vue"
import App from "./App.vue"

import "normalize.css"
import "./styles/reset.css"
import "./styles/tailwindcss.css"

import SvgIcon from "@/components/SvgIcon/index.vue"
import "virtual:svg-icons-register"

createApp(App).component("SvgIcon", SvgIcon).mount("#app")

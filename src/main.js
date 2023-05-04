import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { router } from "@/router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faGear);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(ElementPlus);
app.use(router);
app.mount("#app");

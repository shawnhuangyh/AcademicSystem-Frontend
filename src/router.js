import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "@/utils/token";
import Login from "@/components/Login.vue";
import Class from "@/components/admin/Class.vue";
import { ElMessage } from "element-plus";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/admin/class",
      component: Class,
    },
  ],
});

// router.beforeEach(async (to, from, next) => {
//   // 用户已经登陆
//   if (getToken()) {
//     // 前往登陆界面
//     if (to.path === "/") {
//       ElMessage({
//         type: "warning",
//         message: "已经登录，不能重复登录",
//       });
//       next(from.path);
//     } else {
//       //判断
//       if (useAppStore().user.userInfo.username) {
//         next();
//       } else {
//         //用户登录后获取用户信息
//         try {
//           const result = await useAppStore().dispatch("user/getUserInfo");
//           if (result) {
//             next();
//           }
//         } catch (e) {
//           //token异常了，就清除token
//           await useAppStore().dispatch("user/logout");
//           console.log(e.message);
//           next("/login");
//         }
//       }
//     }
//   } else {
//     //未登录状态下
//     if (to.path.indexOf("/post-article") !== -1) {
//       ElMessage({
//         duration: 1000,
//         message: "当前尚未登录，请先登录",
//       });
//       next("/login");
//     } else {
//       next();
//     }
//   }
// });

export { router };

import { createRouter, createWebHistory } from "vue-router";
import { getRole, getToken, getUser, rmToken } from "@/utils/token";
import { ElMessage } from "element-plus";
import Login from "@/components/Login.vue";
import Class from "@/components/admin/Class.vue";
import Course from "@/components/admin/Course.vue";
import Semester from "@/components/admin/Semester.vue";
import CourseSelection from "@/components/admin/CourseSelection.vue";
import Student from "@/components/admin/Student.vue";
import Teacher from "@/components/admin/Teacher.vue";
import Department from "@/components/admin/Department.vue";
import StudentCourseSelection from "@/components/student/StudentCourseSelection.vue";
import StudentCourse from "@/components/student/StudentCourse.vue";
import TeacherCourse from "@/components/teacher/TeacherClass.vue";
import TeacherScore from "@/components/teacher/TeacherScore.vue";
import StudentCourseDrop from "@/components/student/StudentCourseDrop.vue";
import StudentStatistic from "@/components/student/StudentStatistic.vue";

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
    {
      path: "/admin/course",
      component: Course,
    },
    {
      path: "/admin/semester",
      component: Semester,
    },
    {
      path: "/admin/course_selection",
      component: CourseSelection,
    },
    {
      path: "/admin/student",
      component: Student,
    },
    {
      path: "/admin/teacher",
      component: Teacher,
    },
    {
      path: "/admin/department",
      component: Department,
    },
    {
      path: "/student/select",
      component: StudentCourseSelection,
    },
    {
      path: "/student/drop",
      component: StudentCourseDrop,
    },
    {
      path: "/student/statistic",
      component: StudentStatistic,
    },
    {
      path: "/student/course",
      component: StudentCourse,
    },
    {
      path: "/teacher/class",
      component: TeacherCourse,
    },
    {
      path: "/teacher/score",
      component: TeacherScore,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  // 用户已经登陆
  if (getToken()) {
    const role = getRole();
    let index;
    switch (role) {
      case "ADMIN":
        index = "/admin/course";
        break;
      case "STUDENT":
        index = "/student/select";
        break;
      case "TEACHER":
        index = "/teacher/class";
        break;
    }
    // 前往登陆界面
    if (to.path === "/") {
      ElMessage({
        type: "warning",
        message: "已经登录，不能重复登录",
      });
      next(index);
    } else {
      //判断
      if (getUser()) {
        const role = getRole();
        switch (role) {
          case "ADMIN":
            if (to.path.indexOf("/admin") === -1) {
              ElMessage({
                type: "warning",
                message: "权限不足",
              });
              next(index);
            } else {
              next();
            }
            break;
          case "STUDENT":
            if (to.path.indexOf("/student") === -1) {
              ElMessage({
                type: "warning",
                message: "权限不足",
              });
              next(index);
            } else {
              next();
            }
            break;
          case "TEACHER":
            if (to.path.indexOf("/teacher") === -1) {
              ElMessage({
                type: "warning",
                message: "权限不足",
              });
              next(index);
            } else {
              next();
            }
            break;
        }
      } else {
        //token异常了，就清除token
        await rmToken();
        next("/");
      }
    }
  } else {
    //未登录状态下
    if (
      to.path.indexOf("/student") !== -1 ||
      to.path.indexOf("/admin") !== -1 ||
      to.path.indexOf("/teacher") !== -1
    ) {
      ElMessage({
        duration: 1000,
        message: "当前尚未登录，请先登录",
      });
      next("/");
    } else {
      next();
    }
  }
});

export { router };

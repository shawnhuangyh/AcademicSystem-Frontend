import requests from "@/api/request";

// User related
export const user_login = (data) =>
  requests({
    url: `/token/`,
    method: "post",
    data: data,
  });
export const get_user_role = () =>
  requests({
    url: `/user/role/`,
    method: "get",
  });
export const change_password = (data, username) =>
  requests({
    url: `/user/${username}/`,
    method: "put",
    data: data,
  });

// Department
export const get_department_list = () =>
  requests({
    url: `/department/`,
    method: "get",
  });
export const post_department = (data) =>
  requests({
    url: `/department/`,
    method: "post",
    data: data,
  });
export const delete_department = (dept_id) =>
  requests({
    url: `/department/${dept_id}/`,
    method: "delete",
  });
export const put_department = (dept_id, data) =>
  requests({
    url: `/department/${dept_id}/`,
    method: "put",
    data: data,
  });

// Class
export const get_class_list = (data) =>
  requests({
    url: `/class/`,
    method: "get",
    params: data,
  });
export const put_class = (data) =>
  requests({
    url: `/class/${data.class_id}/`,
    method: "put",
    data: data,
  });
export const delete_class = (class_id) =>
  requests({
    url: `/class/${class_id}/`,
    method: "delete",
  });
export const post_class = (data) =>
  requests({
    url: `/class/`,
    method: "post",
    data: data,
  });

// Course
export const get_course_list = () =>
  requests({
    url: `/course/`,
    method: "get",
  });
export const put_course = (data) =>
  requests({
    url: `/course/${data.course_id}/`,
    method: "put",
    data: data,
  });
export const delete_course = (course_id) =>
  requests({
    url: `/course/${course_id}/`,
    method: "delete",
  });
export const post_course = (data) =>
  requests({
    url: `/course/`,
    method: "post",
    data: data,
  });

// Semester
export const get_semester_list = () =>
  requests({
    url: `/semester/`,
    method: "get",
  });
export const put_semester = (semester_id, data) =>
  requests({
    url: `/semester/${semester_id}/`,
    method: "put",
    data: data,
  });
export const delete_semester = (semester_id) =>
  requests({
    url: `/semester/${semester_id}/`,
    method: "delete",
  });
export const post_semester = (data) =>
  requests({
    url: `/semester/`,
    method: "post",
    data: data,
  });

// Student
export const get_student_list = () =>
  requests({
    url: `/student/`,
    method: "get",
  });
export const put_student = (data) =>
  requests({
    url: `/student/${data.student_id}/`,
    method: "put",
    data: data,
  });
export const delete_student = (student_id) =>
  requests({
    url: `/student/${student_id}/`,
    method: "delete",
  });
export const post_student = (data) =>
  requests({
    url: `/student/`,
    method: "post",
    data: data,
  });

// Teacher
export const get_teacher_list = () =>
  requests({
    url: `/teacher/`,
    method: "get",
  });
export const put_teacher = (data) =>
  requests({
    url: `/teacher/${data.teacher_id}/`,
    method: "put",
    data: data,
  });
export const delete_teacher = (teacher_id) =>
  requests({
    url: `/teacher/${teacher_id}/`,
    method: "delete",
  });
export const post_teacher = (data) =>
  requests({
    url: `/teacher/`,
    method: "post",
    data: data,
  });

// Divider

export const get_course_selection_list = () =>
  requests({
    url: `/course_selection/`,
    method: "get",
  });

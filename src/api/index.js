import requests from "@/api/request";

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

export const get_teacher_list = () =>
  requests({
    url: `/teacher/`,
    method: "get",
  });

export const get_course_list = () =>
  requests({
    url: `/course/`,
    method: "get",
  });

export const get_class_list = (data) =>
  requests({
    url: `/class/`,
    method: "get",
    params: data,
  });
export const get_semester_list = () =>
  requests({
    url: `/semester/`,
    method: "get",
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
export const put_class = (data) =>
  requests({
    url: `/class/${data.class_id}/`,
    method: "put",
    data: data,
  });
export const get_course_selection_list = () =>
  requests({
    url: `/course_selection/`,
    method: "get",
  });
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

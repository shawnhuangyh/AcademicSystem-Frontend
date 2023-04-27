import requests from "@/api/request";

export const departmentList = () =>
  requests({
    url: `/department/`,
    method: "get",
  });

export const get_teacher_list = () =>
  requests({
    url: `/teacher/`,
    method: "get",
  });

export const get_course_ist = () =>
  requests({
    url: `/course/`,
    method: "get",
  });

export const get_class_List = (data) =>
  requests({
    url: `/class/`,
    method: "get",
    params: data,
  });
export const get_semester_ist = () =>
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

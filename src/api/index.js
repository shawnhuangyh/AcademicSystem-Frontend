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

export const get_class_List = (
  pageNum,
  course_id,
  course_name,
  class_id,
  teacher_name
) =>
  requests({
    url: `/class/`,
    method: "get",
    params: {
      page: pageNum,
      course__course_id: course_id,
      course__name: course_name,
      class_no: class_id,
      teacher__name: teacher_name,
    },
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
export const courseSelectionList = () =>
  requests({
    url: `/course_selection/`,
    method: "get",
  });

//注册用户
export const reqRegister = (data) => {
  console.log(data);
  requests({
    url: "/user/register",
    method: "post",
    data,
  });
};

//用户登录
export const reqLogin = (data) =>
  requests({
    url: "/user/login",
    method: "post",
    data,
  });

import requests from "@/api/request";

export const departmentList = () =>
    requests({
        url: `/department/`,
        method: "get",
    });

export const courseList = () =>
    requests({
        url: `/course/`,
        method: "get",
    });

export const classList = (pageNum) =>
    requests({
        url: `/class/`,
        method: "get",
        params: {
            page: pageNum,
        }
    });

//注册用户
export const reqRegister = (data) =>
    requests({
        url: "/user/register",
        method: "post",
        data,
    });

//用户登录
export const reqLogin = (data) =>
    requests({
        url: "/user/login",
        method: "post",
        data,
    });

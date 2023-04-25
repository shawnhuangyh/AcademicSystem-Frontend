import requests from "@/api/request";

//获取验证码
export const reqGetCode = (email) =>
  requests({
    url: `/ec/send/${email}`,
    method: "get",
  });

//校验验证码是否正确
export const reqCheckCode = (code, eid) =>
  requests({
    url: `/ec/check/${code}/${eid}`,
    method: "get",
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

export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};

export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

export const rmToken = () => {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("ROLE");
};

export const setRole = (role) => {
  localStorage.setItem("ROLE", role);
};

export const getRole = () => {
  return localStorage.getItem("ROLE");
};

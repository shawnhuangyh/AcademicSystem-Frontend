export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};

export const setRole = (role) => {
  if (role.data["is_superuser"] === true) {
    localStorage.setItem("ROLE", "ADMIN");
  } else if (role.data["is_staff"] === true) {
    localStorage.setItem("ROLE", "TEACHER");
  } else {
    localStorage.setItem("ROLE", "STUDENT");
  }
  localStorage.setItem("USER", role.data["username"]);
};

export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

export const getUser = () => {
  return localStorage.getItem("USER");
};

export const getRole = () => {
  return localStorage.getItem("ROLE");
};

export const rmToken = () => {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("ROLE");
  localStorage.removeItem("USER");
};

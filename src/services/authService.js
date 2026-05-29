import API from "./api";

export const signup = async (userData) => {
  const response = await API.post("/auth/signup", userData);
  return response.data;
};

export const login = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  const token = response.data.accessToken;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data;
};

export default { signup, login };
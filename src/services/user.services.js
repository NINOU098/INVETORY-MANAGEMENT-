import axiosInstance from "../config/axios";

export const loginUser = async (data) => {
  const res = await axiosInstance.post("/users/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axiosInstance.post("/users/register", data);
  return res;
};

export const getLoggedUser = async (token) => {
  const res = await axiosInstance.get("/users/loggedUser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

export const updateUser = async (data) => {
  const res = await axiosInstance.put(`/users/${data.id}`, data);
  return res.data;
};

export const createUser = async (data) => {
  const res = await axiosInstance.post("/users", data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
};

import axiosInstance from "@/config/axios";

export const getAllRoles = async () => {
  const response = await axiosInstance.get("/roles");

  return response.data;
};

export const createRole = async (data) => {
  const response = await axiosInstance.post("/roles", data);

  return response.data;
};

export const updateRole = async (data) => {
  const response = await axiosInstance.put(`/roles/${data.id}`, data);

  return response.data;
};

export const deleteRole = async (id) => {
  const response = await axiosInstance.delete(`/roles/${id}`);

  return response.data;
};

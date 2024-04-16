import axiosInstance from "@/config/axios";

export const getAllSuppliers = async () => {
  const res = await axiosInstance.get("/suppliers");
  return res.data;
};

export const createSupplier = async (data) => {
  const res = await axiosInstance.post("/suppliers", data);
  return res.data;
};

export const updateSupplier = async (data) => {
  const res = await axiosInstance.put(`/suppliers/${data.id}`, data);
  return res.data;
};

export const deleteSupplier = async (id) => {
  const res = await axiosInstance.delete(`/suppliers/${id}`);
  return res.data;
};

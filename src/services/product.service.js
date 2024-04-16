import axiosInstance from "@/config/axios";

export const getAllProducts = async (page, limit) => {
  const res = await axiosInstance.get(
    `/products?page=${page}&perPage=${limit}`
  );
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};

export const updateProduct = async (data) => {
  const res = await axiosInstance.put(`/products/${data.id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};

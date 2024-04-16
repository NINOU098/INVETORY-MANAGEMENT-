import axiosInstance from "@/config/axios";

export const getAllOrders = async (page, limit) => {
  const response = await axiosInstance.get(
    "/orders?page=" + page + "&perPage=" + limit
  );
  return response.data;
};

export const createOrder = async (data) => {
  const response = await axiosInstance.post("/orders", data);
  return response.data;
};

export const updateOrder = async (data) => {
  const response = await axiosInstance.put("/orders/" + data.id, data);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axiosInstance.delete("/orders/" + id);
  return response.data;
};

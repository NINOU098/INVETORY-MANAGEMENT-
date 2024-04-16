import axiosInstance from "@/config/axios";

export const getAllStockTransactions = async (page, limit) => {
  const response = await axiosInstance.get(
    "/stockTransactions?page=" + page + "&perPage=" + limit
  );
  return response.data;
};

export const createStockTransaction = async (data) => {
  const response = await axiosInstance.post("/stockTransactions", data);
  return response.data;
};

export const updateStockTransaction = async (data) => {
  const response = await axiosInstance.put(
    "/stockTransactions/" + data.id,
    data
  );
  return response.data;
};

export const deleteStockTransaction = async (id) => {
  const response = await axiosInstance.delete("/stockTransactions/" + id);
  return response.data;
};

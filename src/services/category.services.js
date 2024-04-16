import axiosInstance from "@/config/axios";

export const getAllCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axiosInstance.post("/categories", category);
  return response.data;
};

export const updateCategory = async (category) => {
  const response = await axiosInstance.put(
    `/categories/${category.id}`,
    category
  );
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};

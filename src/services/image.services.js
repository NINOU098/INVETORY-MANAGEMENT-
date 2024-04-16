import axiosInstance from "@/config/axios";

export const uploadImage = async (data) => {
  const formData = new FormData();
  formData.append("photo", data);
  const res = await axiosInstance.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

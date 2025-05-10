import { axiosInstance } from "../libs/axios";
import { IProfileData } from "../types/profile";

export const getProfile = async (address: string): Promise<IProfileData> => {
  const response = await axiosInstance.get(`/user/${address.toLowerCase()}`);
  return response.data;
};

export const updateProfile = async (
  id: string,
  payload: { username: string; email: string }
) => {
  const response = await axiosInstance.put(`/user/${id}`, payload);
  return response.data;
};

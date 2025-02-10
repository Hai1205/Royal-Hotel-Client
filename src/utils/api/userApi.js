import axios from "../service/axiosCustomize.js";

export const getAllUsers = async () => {
  return await axios.get("/users/all");
};

export const getUserProfile = async () => {
  return await axios.get("/users/get-logged-in-profile-info");
};

export const getUser = async (userId) => {
  return await axios.get(`/users/get-by-id/${userId}`);
};

export const getUserBookings = async (userId) => {
  return await axios.get(`/users/get-user-bookings/${userId}`);
};

export const deleteUser = async (userId) => {
  return await axios.delete(`/users/delete/${userId}`);
};

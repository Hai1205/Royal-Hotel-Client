import axios from "../service/axiosCustomize.js";

export const registerUser = async (registration) => {
  return await axios.post("/auth/register", registration);
};

export const loginUser = async (loginDetails) => {
  return await axios.post("/auth/login", loginDetails);
};

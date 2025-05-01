import axiosInstance from "./Interceptor";

export const signupService = async (data) => {
  const response = await axiosInstance.post("/api/user/register", data);
  return response.data;
};

export const loginService = async (data) => {
  const response = await axiosInstance.post("/api/user/login", data);
  return response.data;
};

export const logoutService = async () => {
  const response = await axiosInstance.post("/api/user/logout");
  return response.data;
};

export const getUserService = async () => {
  const response = await axiosInstance.get("/api/user/me");
  return response.data;
};

export const requestOtpService = async (email) => {
  const response = await axiosInstance.post("/api/user/send-otp", {
    email,
  });
  return response.data;
};

export const verifyOtpService = async (email, otp) => {
  const response = await axiosInstance.post("/api/user/verify-otp", {
    email,
    otp,
  });
  return response.data;
};

import axiosInstance from "./Interceptor";

export const requestPasswordResetOTPService = async (email) => {
  const response = await axiosInstance.post("/api/user/password-reset-otp", {
    email,
  });
  return response.data;
};

export const verifyPasswordResetOTPService = async (email, otp) => {
  const response = await axiosInstance.post(
    "/api/user/password-reset-verify-otp",
    {
      email,
      otp,
    }
  );
  return response.data;
};

export const resetPasswordService = async (email, newPassword) => {
  const response = await axiosInstance.post("/api/user/password-reset", {
    email,
    newPassword,
  });
  return response.data;
};

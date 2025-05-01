import axiosInstance from "./Interceptor";

export const updateUserProfile = async (formDataToSend) => {
  console.log("data", formDataToSend);
  const response = await axiosInstance.put(
    "/api/profile/update",
    formDataToSend
  );
  return response.data;
};

export const updateUserSubscription = async (isSubscribed) => {
  console.log("isSubscribed", isSubscribed);
  const response = await axiosInstance.post(
    "/api/profile/update-subscription",
    {
      isSubscribed,
    }
  );
  return response.data;
};

export const updateUserProfileImage = async (formDataToSend) => {
  console.log("data", formDataToSend);
  const response = await axiosInstance.post("/api/upload", formDataToSend);
  return response.data;
};
// import { API_URL } from "../config";

// // Get user profile data
// export const getUserProfile = async (userId) => {
//   try {
//     // Replace with your actual API endpoint
//     const response = await axios.get(`${API_URL}/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     throw error;
//   }
// };

// // Update user profile
// export const updateUserProfile = async (userId, userData) => {
//   try {
//     // Replace with your actual API endpoint
//     const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return {
//       success: true,
//       data: response.data,
//     };
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     return {
//       success: false,
//       error: error.response?.data?.message || "An error occurred",
//     };
//   }
// };

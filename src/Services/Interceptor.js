import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080",
  // baseURL: "https://walshop-service.onrender.com",
  baseURL: "http://ec2-3-27-8-162.ap-southeast-2.compute.amazonaws.com:8080",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

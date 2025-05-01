import axiosInstance from "./Interceptor";

export const placeOrder = async (cartItems, formData) => {
  const response = await axiosInstance.post("/api/order/place-order", {
    cartItems,
    formData,
  });
  return response.data;
};

export const getOrdersService = async () => {
  const response = await axiosInstance.get("/api/order/get-orders");
  return response.data;
};

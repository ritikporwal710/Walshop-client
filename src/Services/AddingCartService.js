import axiosInstance from "./Interceptor";

export const addToCartService = async (product, quantity = 1) => {
  const response = await axiosInstance.post("api/cart/add-to-cart", {
    product,
    quantity,
  });
  return response.data;
};

export const getCartService = async () => {
  const response = await axiosInstance.get("api/cart/get-cart-items");
  return response.data;
};

export const removeFromCartService = async (itemId) => {
  const response = await axiosInstance.post("api/cart/remove-from-cart", {
    itemId,
  });
  return response.data;
};

export const clearCartService = async () => {
  const response = await axiosInstance.post("api/cart/clear-cart");
  return response.data;
};

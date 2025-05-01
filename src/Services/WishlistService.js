import axiosInstance from "./Interceptor";

// Get wishlist items
export const getWishlistService = async () => {
  try {
    const response = await axiosInstance.get(`/api/wishlist`);
    return response.data;
  } catch (error) {
    console.error("Error getting wishlist:", error);
    throw error;
  }
};

// Add item to wishlist
export const addToWishlistService = async (itemId) => {
  try {
    const response = await axiosInstance.post(`/api/wishlist/add-to-wishlist/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Remove item from wishlist
export const removeFromWishlistService = async (itemId) => {
  try {
    const response = await axiosInstance.delete(`/api/wishlist/remove-from-wishlist/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};

export const clearWishlistService = async () => {
  try {
    const response = await axiosInstance.delete(`/api/wishlist/clear-wishlist`);
    return response.data;
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    throw error;
  }
};

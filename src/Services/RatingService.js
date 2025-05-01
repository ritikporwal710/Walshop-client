import axiosInstance from "./Interceptor";

// Submit a rating for an order
export const submitOrderRating = async (
  itemId,
  rating,
  comment,
  orderNumber,
  purchaseDate
) => {
  try {
    const response = await axiosInstance.post(
      `/api/rating/submit-order-rating`,
      {
        itemId,
        starRating: rating,
        comment,
        orderNumber,
        purchaseDate,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting order rating:", error);
    throw error;
  }
};

// Get ratings for an order
export const getOrderRatingService = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/rating/get-all-order-ratings`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting order ratings:", error);
    throw error;
  }
};

import axiosInstance from "./Interceptor";

const getProducts = async (page = 1, limit = 12) => {
  const response = await axiosInstance.get(
    `api/item/get-items?page=${page}&limit=${limit}`
  );
  return response.data;
};

const getAllProductByCategory = async (categoryId, searchQuery) => {
  const response = await axiosInstance.get(
    `api/item/get-items/${categoryId}?search=${searchQuery}`
  );
  return response.data;
};

const getProductById = async (itemId) => {
  const response = await axiosInstance.get(`api/item/get-item/${itemId}`);
  return response.data;
};

const getReviewsByItemId = async (itemId, page = 1, limit = 4) => {
  console.log("itemId", itemId);
  const response = await axiosInstance.get(`api/item/get-item-reviews`, {
    params: {
      id: itemId,
      page,
      limit,
    },
  });
  return response.data;
};

export {
  getProducts,
  getAllProductByCategory,
  getProductById,
  getReviewsByItemId,
};

import axiosInstance from "./Interceptor";

export const getAvailableDiscountsService = async () => {
    const response = await axiosInstance.get("api/discount/available-discounts")
    return response.data;
}


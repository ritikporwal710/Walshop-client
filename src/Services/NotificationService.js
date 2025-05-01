import axiosInstance from "./Interceptor";

export const getNotficationsByType = async (type) => {
  const response = await axiosInstance.get(
    `api/notification/get-notification-by-type`,
    {
      params: {
        type: type,
      },
    }
  );

  return response.data;
};

export const markNotificationAsRead = async (id) => {
  const response = await axiosInstance.put(
    `api/notification/mark-notification-as-read`,
    { id }
  );
  return response.data;
};


export const getUnreadNotificationsCount = async () => {
  const response = await axiosInstance.get(
    `api/notification/get-unread-notifications-count`
  );
  return response.data;
};


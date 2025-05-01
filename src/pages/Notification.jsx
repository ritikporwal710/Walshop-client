import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  CircularProgress,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
  Button,
} from "@mui/material";
import {
  LocalShipping,
  ShoppingBag,
  LocalOffer,
  Notifications,
  Delete as DeleteIcon,
  CheckCircle,
  Error,
  Info,
} from "@mui/icons-material";
import { format } from "date-fns";
import {
  getNotficationsByType,
  markNotificationAsRead,
} from "../Services/NotificationService";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useAuth } from "../context/AuthContext";

// Mock data for notifications
// const mockNotifications = {
//   products: [
//     {
//       id: 1,
//       title: "Your order has been shipped",
//       message:
//         "Your order #ORD12345 has been shipped and will arrive in 2-3 days.",
//       date: new Date(2023, 3, 5),
//       read: false,
//       type: "product",
//       status: "success",
//     },
//     {
//       id: 2,
//       title: "Price dropped on your wishlist item",
//       message:
//         "Good news! The Nike Air Max you added to your wishlist is now 15% off.",
//       date: new Date(2023, 3, 3),
//       read: true,
//       type: "product",
//       status: "info",
//     },
//     {
//       id: 3,
//       title: "Item back in stock",
//       message:
//         "The Adidas Ultraboost is back in stock. Get it before it's gone again!",
//       date: new Date(2023, 3, 1),
//       read: false,
//       type: "product",
//       status: "info",
//     },
//   ],
//   delivery: [
//     {
//       id: 4,
//       title: "Your package is out for delivery",
//       message: "Your order #ORD12345 will be delivered today between 2-4 PM.",
//       date: new Date(2023, 3, 5),
//       read: false,
//       type: "delivery",
//       status: "success",
//     },
//     {
//       id: 5,
//       title: "Delivery delayed",
//       message:
//         "Due to bad weather, your delivery for order #ORD54321 is delayed by 1 day.",
//       date: new Date(2023, 3, 2),
//       read: true,
//       type: "delivery",
//       status: "warning",
//     },
//     {
//       id: 6,
//       title: "Package delivered",
//       message:
//         "Your order #ORD98765 has been delivered. Please rate your experience.",
//       date: new Date(2023, 2, 28),
//       read: true,
//       type: "delivery",
//       status: "success",
//     },
//   ],
//   offers: [
//     {
//       id: 7,
//       title: "Weekend Sale: 20% OFF",
//       message: "Use code WEEKEND20 for 20% off on all products this weekend.",
//       date: new Date(2023, 3, 4),
//       read: false,
//       type: "offer",
//       status: "info",
//     },
//     {
//       id: 8,
//       title: "Special offer just for you",
//       message:
//         "As a valued customer, you get an exclusive 10% discount on your next purchase.",
//       date: new Date(2023, 3, 1),
//       read: true,
//       type: "offer",
//       status: "info",
//     },
//     {
//       id: 9,
//       title: "Flash Sale Alert!",
//       message:
//         "Flash sale starting in 2 hours. Get up to 50% off on selected items.",
//       date: new Date(2023, 2, 27),
//       read: false,
//       type: "offer",
//       status: "info",
//     },
//   ],
// };

const Notification = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { unreadNotifications, setUnreadNotifications } = useAuth();

  const [notifications, setNotifications] = useState({
    products: [],
    delivery: [],
    offers: [],
  });
  const getDeliveryNotifications = async () => {
    const response = await getNotficationsByType("delivery");
    // console.log("response of delivery", response.notifications);
    setNotifications((prevState) => ({
      ...prevState,
      delivery: response.notifications || [],
    }));
  };

  const getProductNotifications = async () => {
    const response = await getNotficationsByType("product");
    // console.log("response of product    beffffffffffore", response);
    console.log("notification of product", response.notifications);
    console.log("object", notifications.products);
    // setNotifications({
    //   products: response.notifications,
    // });
    setNotifications((prevState) => ({
      ...prevState,
      products: response.notifications || [],
    }));
  };

  const getOfferNotifications = async () => {
    const response = await getNotficationsByType("offer");
    // console.log("response of offer", response.notifications);
    // setNotifications({
    //   offers: response.notifications,
    // });
    setNotifications((prevState) => ({
      ...prevState,
      offers: response.notifications || [],
    }));
  };

  useEffect(() => {
    // Simulate API call to fetch notifications
    // const response = await getNotifications();
    window.scrollTo(0, 0);
    setTimeout(() => {
      getDeliveryNotifications();
      getProductNotifications();
      getOfferNotifications();
      setLoading(false);
    }, 400);

    // setTimeout(() => {
    // setNotifications(mockNotifications);
    //   setLoading(false);
    // }, 1000);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const markAsRead = async (id, type) => {
    if (type === "product") {
      type = "products";
    }
    if (type === "offer") {
      type = "offers";
    }

    console.log(`Marking notification ${id} of type ${type} as read/unread`);
    setNotifications((prev) => {
      console.log("Previous notifications state:", prev);
      const updatedNotifications = {
        ...prev,
        [type]: prev[type].map((notification) => {
          if (notification.id === id) {
            const newReadStatus = notification.read === true ? false : true;
            console.log(
              `Changing read status from ${notification.read} to ${newReadStatus} for notification:`,
              notification
            );
            return { ...notification, read: newReadStatus };
          }
          return notification;
        }),
      };
      console.log("Updated notifications state:", updatedNotifications);
      return updatedNotifications;
    });
    await markNotificationAsRead(id);
  };

  // useEffect(() => {
  // console.log("notifications", notifications);
  // setTimeout(() => {
  // getDeliveryNotifications();
  // getProductNotifications();
  // getOfferNotifications();
  // setLoading(false);
  // }, 400);
  // }, [notifications]);

  const deleteNotification = (id, type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: prev[type].filter((notification) => notification.id !== id),
    }));
  };

  const getNotificationIcon = (type) => {
    if (type === "product") {
      return <ShoppingBag color="primary" />;
    } else if (type === "delivery") {
      return <LocalShipping color="primary" />;
    } else if (type === "offer") {
      return <LocalOffer color="primary" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle fontSize="small" color="success" />;
      case "warning":
        return <Error fontSize="small" color="warning" />;
      case "info":
        return <Info fontSize="small" color="info" />;
      default:
        return null;
    }
  };

  const getTabContent = () => {
    // console.log("object", notifications);
    let notificationList = [];

    switch (activeTab) {
      // case 0: // All
      //   notificationList = [
      //     ...notifications.products,
      //     ...notifications.delivery,
      //     ...notifications.offers,
      //   ].sort((a, b) => b.date - a.date);
      //   break;
      case 0: // All
        notificationList = [
          ...notifications.products,
          ...notifications.delivery,
          ...notifications.offers,
        ];
        break;
      case 1: // Products
        notificationList = notifications.products;
        break;
      case 2: // Delivery
        notificationList = notifications.delivery;
        break;
      case 3: // Offers
        notificationList = notifications.offers;
        break;
      default:
        notificationList = [];
    }

    if (notificationList.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
          }}
        >
          <Notifications
            sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary">
            No notifications to display
          </Typography>
        </Box>
      );
    }

    return (
      <List sx={{ width: "100%" }}>
        {notificationList.map((notification) => (
          <React.Fragment key={notification.id}>
            <ListItem
              sx={{
                bgcolor: notification.read ? "transparent" : "action.hover",
                py: 2,
                display: "flex",
                alignItems: "center",
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="mark as read"
                  onClick={() => markAsRead(notification.id, notification.type)}
                  sx={{
                    background: notification.read
                      ? "rgba(76, 175, 80, 0.1)"
                      : "rgba(25, 118, 210, 0.1)",
                    borderRadius: "8px",
                    // padding: { xs: '6px 6px', md: '8px 16px', lg: '10px 20px' },
                    padding: { xs: "6px 6px", md: "8px 16px", lg: "10px 20px" },
                    marginTop: { xs: "-70px", md: "10px" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: notification.read
                        ? "rgba(76, 175, 80, 0.2)"
                        : "rgba(25, 118, 210, 0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <MarkEmailReadIcon
                    color={notification.read ? "success" : "primary"}
                    sx={{
                      fontSize: "1.2rem",
                      mr: 0.5,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      color: notification.read
                        ? "success.main"
                        : "primary.main",
                    }}
                  >
                    {notification.read ? "Read" : "Mark read"}
                  </Typography>
                </IconButton>
              }
            >
              <ListItemAvatar sx={{ minWidth: 56, my: "auto" }}>
                <Badge
                  color="error"
                  variant="dot"
                  invisible={notification.read}
                  overlap="circular"
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        notification.type === "product"
                          ? "rgba(201, 39, 230, 0.2)"
                          : notification.type === "delivery"
                          ? "rgba(61, 241, 25, 0.2)"
                          : "rgba(247, 255, 7, 0.2)",
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </Badge>
              </ListItemAvatar>

              {/* Custom implementation instead of ListItemText */}
              <Box
                sx={{
                  flex: 1,
                  ml: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: "100%",
                }}
                component="div"
              >
                <Box component="div" display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    fontWeight={notification.read ? 400 : 600}
                  >
                    {notification.title}
                  </Typography>
                  {getStatusIcon(notification.status)}
                </Box>

                <Typography
                  component="div"
                  variant="body2"
                  color="text.primary"
                  sx={{ my: 1 }}
                >
                  {notification.message}
                </Typography>

                <Box
                  component="div"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    component="div"
                    variant="caption"
                    color="text.secondary"
                  >
                    {notification.createdAt
                      ? format(new Date(notification.createdAt), "MMM d, yyyy")
                      : ""}
                    {/* {notification.date} */}
                    {/* {notification.createdAt} */}
                  </Typography>
                  {/* <Chip
                    size="small"
                    label={notification.type}
                    color={
                      notification.type === "product"
                        ? "primary"
                        : notification.type === "delivery"
                        ? "secondary"
                        : "warning"
                    }
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                  /> */}
                </Box>
              </Box>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    );
  };

  const unreadCount = {
    all:
      notifications.products.filter((n) => !n.read).length +
      notifications.delivery.filter((n) => !n.read).length +
      notifications.offers.filter((n) => !n.read).length,
    products: notifications.products.filter((n) => !n.read).length,
    delivery: notifications.delivery.filter((n) => !n.read).length,
    offers: notifications.offers.filter((n) => !n.read).length,
  };

  useEffect(() => {
    console.log("unreadCount.all", unreadCount.all);
    setUnreadNotifications(unreadCount.all);
  }, [unreadCount.all]);

  return (
    <Container sx={{ py: 4, maxWidth: { xs: "100%", md: "1000px" } }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Notifications
        </Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />

      <Paper sx={{ width: "100%", boxShadow: 2, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : false}
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            label="All"
            icon={
              unreadCount.all > 0 ? (
                <Badge badgeContent={unreadCount.all} color="error">
                  <Notifications />
                </Badge>
              ) : (
                <Notifications />
              )
            }
            iconPosition="start"
          />
          <Tab
            label="Products"
            icon={
              unreadCount.products > 0 ? (
                <Badge badgeContent={unreadCount.products} color="error">
                  <ShoppingBag />
                </Badge>
              ) : (
                <ShoppingBag />
              )
            }
            iconPosition="start"
          />
          <Tab
            label="Delivery"
            icon={
              unreadCount.delivery > 0 ? (
                <Badge badgeContent={unreadCount.delivery} color="error">
                  <LocalShipping />
                </Badge>
              ) : (
                <LocalShipping />
              )
            }
            iconPosition="start"
          />
          <Tab
            label="Offers"
            icon={
              unreadCount.offers > 0 ? (
                <Badge badgeContent={unreadCount.offers} color="error">
                  <LocalOffer />
                </Badge>
              ) : (
                <LocalOffer />
              )
            }
            iconPosition="start"
          />
        </Tabs>

        {loading ? (
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 8,
            }}
          >
            <CircularProgress />
          </Paper>
        ) : (
          <Paper sx={{ p: { xs: 1, sm: 2 } }}>{getTabContent()}</Paper>
        )}
      </Paper>
    </Container>
  );
};

export default Notification;

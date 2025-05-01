import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Adjust path as needed
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Badge,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Snackbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import InventoryIcon from "@mui/icons-material/Inventory";
import PendingIcon from "@mui/icons-material/Pending";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EditIcon from "@mui/icons-material/Edit";
import { getOrdersService } from "../../Services/PlaceOrder";
import {
  getOrderRatingService,
  submitOrderRating,
} from "../../Services/RatingService";
import { useNavigate } from "react-router-dom";

// Styled components
const OrderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
}));

const OrderStatusChip = styled(Chip)(({ theme, orderstatus }) => {
  const statusColors = {
    delivered: {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.success.dark,
    },
    processing: {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.info.dark,
    },
    shipped: {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.warning.dark,
    },
    cancelled: {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.dark,
    },
    pending: {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[800],
    },
  };

  return {
    ...(statusColors[orderstatus] || statusColors.processing),
    fontWeight: 600,
    borderRadius: 8,
  };
});

const ProductImage = styled(CardMedia)(({ theme }) => ({
  width: 130,
  height: 130,
  borderRadius: theme.spacing(1),
  objectFit: "cover",
  border: `1px solid ${theme.palette.divider}`,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: -5,
    padding: "0 4px",
    backgroundColor: theme.palette.primary.main,
  },
}));

const OrderHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(2, 3),
}));

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return <CheckCircleIcon sx={{ color: "success.main" }} />;
    case "processing":
      return <RotateRightIcon sx={{ color: "info.main" }} />;
    case "shipped":
      return <LocalShippingIcon sx={{ color: "warning.main" }} />;
    case "cancelled":
      return <CancelIcon sx={{ color: "error.main" }} />;
    case "pending":
      return <PendingIcon sx={{ color: "text.secondary" }} />;
    default:
      return <InventoryIcon sx={{ color: "info.main" }} />;
  }
};

// Default product images by category (as fallback only)
const getDefaultImage = (productName) => {
  const productNameLower = productName.toLowerCase();
  if (
    productNameLower.includes("shirt") ||
    productNameLower.includes("t-shirt")
  ) {
    return "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200&h=200&fit=crop";
  } else if (
    productNameLower.includes("jeans") ||
    productNameLower.includes("pants")
  ) {
    return "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop";
  } else if (
    productNameLower.includes("shoes") ||
    productNameLower.includes("sneakers")
  ) {
    return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop";
  } else if (productNameLower.includes("headphones")) {
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
  } else if (
    productNameLower.includes("case") ||
    productNameLower.includes("phone")
  ) {
    return "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=200&h=200&fit=crop";
  } else if (
    productNameLower.includes("laptop") ||
    productNameLower.includes("cooling")
  ) {
    return "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=200&h=200&fit=crop";
  }
  // Default fallback image
  return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop";
};

// Group orders by order number since API may return flat structure
const groupOrdersByOrderNumber = (orders) => {
  const groupedOrders = {};

  orders.forEach((order) => {
    const orderKey = order.orderNumber.toString();

    if (!groupedOrders[orderKey]) {
      groupedOrders[orderKey] = {
        id: order.id,
        orderNumber: order.orderNumber,
        orderDate: order.orderDate,
        status: order.status,
        totalPrice: 0,
        items: [],
        name: order.name,
        address: order.address,
        city: order.city,
        pinCode: order.pinCode,
        phone: order.phone,
      };
    }

    // Add this item to the order
    groupedOrders[orderKey].items.push({
      id: order.itemId,
      itemName: order.itemName,
      totalPrice: order.totalPrice,
      quantity: order.quantity,
      imageUrl: order.imageUrl,
      itemDescription: order.itemDescription,
      rating: order.rating || 0,
      review: order.review || "",
      hasRated: Boolean(order.rating),
    });

    // Update total price (this may need adjustment based on how the API calculates totals)
    const itemTotal = parseFloat(order.totalPrice) * order.quantity;
    groupedOrders[orderKey].totalPrice += itemTotal;
  });

  return Object.values(groupedOrders);
};

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [hover, setHover] = useState(-1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { currentUser } = useAuth(); // Assuming you have auth context
  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
    getOrderRatings();
    window.scrollTo(0, 0);
  }, []);

  const getOrders = async () => {
    try {
      const response = await getOrdersService();
      // Group orders by order number since API returns flat structure
      const groupedOrders = groupOrdersByOrderNumber(response.orders).sort(
        (a, b) => b.orderNumber - a.orderNumber
      );

      setOrders(groupedOrders);
      setLoading(false);
    } catch {
      setError("Failed to fetch orders. Please try again later.");
      setLoading(false);
    }
  };

  const getOrderRatings = async () => {
    try {
      const response = await getOrderRatingService();
      console.log("order ratings", response.data);
    } catch (error) {
      console.error("Error fetching order ratings:", error);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRatingClick = (order, item, editMode = false) => {
    setSelectedOrder(order);
    setSelectedItem(item);
    setRatingDialogOpen(true);
    setIsEditMode(editMode);

    // If editing an existing rating, pre-fill the form
    if (editMode && item.hasRated) {
      setRating(item.rating || 0);
      setComment(item.review || "");
    } else {
      setRating(0);
      setComment("");
    }
  };

  const handleCloseRatingDialog = () => {
    setRatingDialogOpen(false);
    setSelectedItem(null);
    setSelectedOrder(null);
    setIsEditMode(false);
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      setSnackbarMessage("Please select a rating");
      setSnackbarOpen(true);
      return;
    }

    try {
      console.log(selectedItem.id, rating, comment);
      console.log(selectedOrder.orderDate);

      const purchaseDate = selectedOrder.orderDate.split("T")[0];

      console.log("secleing order", selectedOrder, selectedItem);
      // Submit rating for the specific item
      await submitOrderRating(
        selectedItem.id,
        rating,
        comment,
        selectedOrder.orderNumber,
        purchaseDate
      );

      console.log("rating submitted");
      console.log("orders", orders);

      // Update local state to reflect the new rating
      const updatedOrders = orders.map((order) => {
        if (order.id === selectedOrder.id) {
          return {
            ...order,
            items: order.items.map((item) => {
              if (item.id === selectedItem.id) {
                return {
                  ...item,
                  rating,
                  review: comment,
                  hasRated: true,
                };
              }
              return item;
            }),
          };
        }
        return order;
      });

      setOrders(updatedOrders);
      setSnackbarMessage(
        isEditMode
          ? "Your review has been updated!"
          : "Thank you for your feedback!"
      );
      setSnackbarOpen(true);
      setRatingDialogOpen(false);

      // Refresh orders to update UI if necessary
      getOrders();
    } catch (err) {
      console.error("Rating submission error:", err);
      setSnackbarMessage("Failed to submit rating. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getLabelText = (value) => {
    const labels = {
      1: "Unsatisfied",
      2: "Poor",
      3: "Ok",
      4: "Good",
      5: "Excellent",
    };

    return labels[value] || "";
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={2}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <CircularProgress color="primary" size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 3, fontWeight: 500 }}>
            Loading your orders...
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }} variant="filled">
            <Typography variant="subtitle1">Something went wrong</Typography>
            <Typography variant="body2">{error}</Typography>
          </Alert>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
              sx={{ borderRadius: 2 }}
            >
              Try Again
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          backgroundImage: "linear-gradient(to bottom, #f9fafb, #ffffff)",
        }}
      >
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <ShoppingBagIcon
            sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
          />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              background: "linear-gradient(90deg, #1976d2, #64b5f6)",
              backgroundClip: "text",
              color: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            My Orders
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Track your order history and check the status of your purchases
          </Typography>
        </Box>

        {orders.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 8,
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: "#5dd16d",
                mb: 3,
              }}
            >
              <ShoppingBagIcon sx={{ fontSize: 70, color: "primary.main" }} />
            </Avatar>
            <Typography
              variant="h5"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 500 }}
            >
              No orders found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ maxWidth: 400, mb: 3 }}
            >
              Looks like you haven't placed any orders yet. Start shopping to
              see your orders here.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 2,
                borderRadius: 2,
                px: 4,
                py: 1,
                fontWeight: 600,
                boxShadow: 4,
              }}
              href="/"
            >
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Box>
            {orders.map((order) => (
              <OrderCard key={order.id} elevation={2}>
                <OrderHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "primary.light" }}>
                      {getStatusIcon(order.status)}
                    </Avatar>
                  }
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Order #{order.orderNumber}
                      </Typography>
                      <OrderStatusChip
                        label={
                          order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        }
                        orderstatus={order.status.toLowerCase()}
                        size="medium"
                        icon={getStatusIcon(order.status)}
                      />
                    </Box>
                  }
                  subheader={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Placed on {formatDate(order.orderDate)}
                    </Typography>
                  }
                />
                <Divider />
                <CardContent sx={{ px: 3, py: 2 }}>
                  <Grid container spacing={3}>
                    {order.items &&
                      order.items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              p: 2,
                              bgcolor: "background.paper",
                              borderRadius: 2,
                              boxShadow: 1,
                              height: "100%",
                              width: "500px",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: { xs: 2, sm: 0 },
                              }}
                            >
                              <StyledBadge
                                badgeContent={item.quantity}
                                color="primary"
                              >
                                <ProductImage
                                  component="img"
                                  image={
                                    item.imageUrl ||
                                    getDefaultImage(item.itemName)
                                  }
                                  onClick={() => navigate(`/item/${item.id}`)}
                                  style={{ cursor: "pointer" }}
                                  alt={item.itemName}
                                />
                              </StyledBadge>
                            </Box>
                            <Box
                              sx={{
                                ml: { xs: 0, sm: 2 },
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, mb: 0.5 }}
                                onClick={() => navigate(`/item/${item.id}`)}
                                style={{ cursor: "pointer" }}
                              >
                                {item.itemName}
                              </Typography>

                              {item.itemDescription && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 1 }}
                                >
                                  {item.itemDescription}
                                </Typography>
                              )}

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 0.5 }}
                              >
                                Qty: {item.quantity}
                              </Typography>

                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: "bold",
                                  color: "primary.main",
                                  mt: "auto",
                                }}
                              >
                                ₹{item.totalPrice}
                              </Typography>

                              {/* Show rating if already rated, otherwise show the rate button */}
                              {order.status.toLowerCase() === "delivered" &&
                                (item.hasRated ? (
                                  <Box sx={{ mt: 1.5 }}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Rating
                                        value={item.rating}
                                        readOnly
                                        size="small"
                                        precision={0.5}
                                      />
                                      <Tooltip title="Edit review">
                                        <IconButton
                                          size="small"
                                          onClick={() =>
                                            handleRatingClick(order, item, true)
                                          }
                                          sx={{ color: "warning.main" }}
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                    {item.review && (
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                          mt: 0.5,
                                          fontSize: "0.8rem",
                                          display: "-webkit-box",
                                          overflow: "hidden",
                                          WebkitLineClamp: 2,
                                          WebkitBoxOrient: "vertical",
                                        }}
                                      >
                                        "{item.review}"
                                      </Typography>
                                    )}
                                  </Box>
                                ) : (
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<StarIcon />}
                                    onClick={() =>
                                      handleRatingClick(order, item)
                                    }
                                    sx={{
                                      mt: 1.5,
                                      borderRadius: 2,
                                      borderColor: "warning.main",
                                      color: "warning.main",
                                      "&:hover": {
                                        borderColor: "warning.dark",
                                        bgcolor: "warning.light",
                                        color: "warning.dark",
                                      },
                                    }}
                                  >
                                    Rate Item
                                  </Button>
                                ))}
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    px: 3,
                    py: 2,
                    bgcolor: "background.paper",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Amount:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "primary.dark" }}
                    >
                      ₹{order.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                  {/* Address information */}
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor: "background.paper",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      width: { xs: "100%", sm: "40%" },
                      marginRight: { xs: 0, sm: "1rem" },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="primary.main"
                      sx={{
                        fontWeight: 600,
                        mb: 0.75,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      Shipping Details:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 500 }}
                    >
                      {order.name || "Name not available"}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      {order.address || "Address not available"}
                      {order.city}
                      {order.pinCode ? `, ${order.pinCode}` : ""}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {order.phone && `Phone: ${order.phone}`}
                    </Typography>
                  </Box>
                </CardActions>
              </OrderCard>
            ))}
          </Box>
        )}
      </Paper>

      {/* Rating Dialog for specific item */}
      <Dialog
        open={ratingDialogOpen}
        onClose={handleCloseRatingDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1, pt: 3 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {isEditMode ? "Edit Your Review" : "Rate This Product"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {isEditMode
              ? "Update your feedback for"
              : "Share your experience with"}{" "}
            {selectedItem?.itemName}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <img
                src={
                  selectedItem?.imageUrl ||
                  (selectedItem && getDefaultImage(selectedItem.itemName))
                }
                alt={selectedItem?.itemName}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {selectedItem?.itemName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Order #{selectedOrder?.orderNumber}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Rating
                size="large"
                value={rating}
                precision={1}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
                sx={{ mb: 1, fontSize: "2.5rem" }}
              />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {hover !== -1
                  ? getLabelText(hover)
                  : rating
                  ? getLabelText(rating)
                  : "Rate this product"}
              </Typography>
            </Box>

            <TextField
              label="Your Review (Optional)"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              placeholder="Share your thoughts about this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseRatingDialog}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitRating}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, px: 3 }}
          >
            {isEditMode ? "Update Review" : "Submit Review"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default MyOrder;

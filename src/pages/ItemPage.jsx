import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Rating,
  Divider,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Favorite,
  ShoppingCart,
  LocalOffer,
  Loop,
  CreditCard,
  VerifiedUser,
  Comment,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import {
  getProductById,
  getProducts,
  getReviewsByItemId,
} from "../Services/ProductService";
import { useWishlist } from "../context/WishlistContext";
import { getAvailableDiscountsService } from "../Services/DiscountService";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { wishlistItems, addToWishlist } = useWishlist();
  const [listItemDiscounts, setListItemDiscounts] = useState([]);
  // Sample reviews data - in a real app, this would come from your API
  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: "John D.",
      rating: 5,
      date: "2023-08-15",
      comment: "Excellent product! Exactly as described and arrived quickly.",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      username: "Sarah M.",
      rating: 4,
      date: "2023-07-28",
      comment: "Great value for money. Very happy with the purchase.",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 3,
      username: "Michael T.",
      rating: 4.5,
      date: "2023-09-02",
      comment:
        "Good quality product. Would recommend to others looking for something similar.",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
  ]);

  const getProductDetail = async () => {
    const response = await getProductById(id);
    console.log(response.item);
    setItem(response.item);
    setLoading(false);
  };

  useEffect(() => {
    if (relatedItems.length > 0) {
      // Shuffle the relatedItems array using Fisher-Yates algorithm
      const shuffledItems = [...relatedItems];
      for (let i = shuffledItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledItems[i], shuffledItems[j]] = [
          shuffledItems[j],
          shuffledItems[i],
        ];
      }
      setRelatedItems(shuffledItems);
    }
  }, [relatedItems.length]);

  const fetchRelatedItems = async () => {
    try {
      const response = await getProducts();
      if (response.items && response.items.length > 0) {
        // Filter out current item and limit to 4 items
        const filtered = response.items
          .filter((relatedItem) => relatedItem.itemId !== parseInt(id))
          .slice(0, 4);
        setRelatedItems(filtered);
      }
    } catch (err) {
      console.error("Error fetching related items:", err);
    }
  };

  const getAllDiscounts = async () => {
    const response = await getAvailableDiscountsService();
    setListItemDiscounts(response.data);
    console.log(response);
  };
  const getReviews = async () => {
    console.log("id aa raha hai", id);
    const response = await getReviewsByItemId(id, 1, 4);
    setReviews(response.reviews);
    console.log(response);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        getProductDetail();
        getAllDiscounts();
        getReviews();
        // Assuming there's an endpoint to get a single item by ID
        // const response = await axiosInstance.get(`api/item/${id}`);
        // setItem(response.data);
        // setLoading(false);
      } catch (err) {
        console.error("Error fetching item:", err);
        setError("Failed to load item details");
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
      window.scrollTo(0, 0);
    }
  }, [id]);

  useEffect(() => {
    if (item) {
      fetchRelatedItems();
    }
  }, [item]);

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, 1);
      // Optional: Show a notification that item was added to cart
    }
  };
  const handleAddToWishlist = () => {
    if (item) {
      addToWishlist(item.itemId);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading item details...
        </Typography>
      </Container>
    );
  }

  if (error || !item) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {error || "Item Not Found"}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          Sorry, the item you are looking for could not be loaded.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Return to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Grid container spacing={6}>
        {/* Left side - Image */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              p: 4,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.itemName}
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>

        {/* Right side - Item Details */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box>
            <Chip
              label={
                item.itemCategory.charAt(0).toUpperCase() +
                item.itemCategory.slice(1)
              }
              color="primary"
              size="small"
              sx={{ mb: 2 }}
            />

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {item.itemName}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              {item.itemRating > 0 ? (
                <>
                  <Rating
                    value={parseFloat(item.itemRating)}
                    precision={0.1}
                    readOnly
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({item.itemRating} rating)
                  </Typography>
                </>
              ) : (
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontStyle: "italic",
                    bgcolor: "rgba(0, 0, 0, 0.05)",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1
                  }}
                >
                  Not yet rated
                </Typography>
              )}
            </Box>

            <Typography
              variant="h4"
              color="primary"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              ₹{item.itemPrice}
            </Typography>

            {/* Available Offers Section */}
            <Paper
              elevation={0}
              sx={{ p: 2, bgcolor: "#f8f9fa", mb: 1, borderRadius: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocalOffer color="error" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Available Offers
                </Typography>
              </Box>
              <List dense disablePadding>
                {listItemDiscounts &&
                  listItemDiscounts.map((discount, index) => (
                    <ListItem disableGutters key={index}>
                      <ListItemText
                        primary={discount.descriptionTemplate
                          .replace(
                            "${discount_percent}",
                            discount.discountPercent
                          )
                          .replace(
                            "${min_amount}",
                            parseInt(discount.minAmount)
                          )}
                        secondary={`Min purchase: ₹${discount.minAmount}`}
                      />
                    </ListItem>
                  ))}
                {/* <ListItem disableGutters>
                  <ListItemText
                    primary="Buy 1 Get 1 Free on selected items"
                    secondary="Limited time offer"
                  />
                </ListItem> */}
                <ListItem disableGutters>
                  <ListItemText
                    primary="Free Shipping"
                    secondary="On orders above ₹100"
                  />
                </ListItem>
              </List>
            </Paper>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ mb: 2 }}>
              {item.itemDescription}
            </Typography>

            {/* Services Section */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Loop color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">7 Days Return Policy</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CreditCard color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Pay Later Option Available
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <VerifiedUser color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">Authentic Product</Typography>
                </Box>
              </Grid>
              {/* <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ShoppingCart color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">Secure Checkout</Typography>
                </Box>
              </Grid> */}
            </Grid>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  if (
                    cartItems.some((itemObj) => itemObj.itemId === item.itemId)
                  ) {
                    navigate("/cart");
                  } else {
                    handleAddToCart();
                  }
                }}
                sx={{ px: 4, py: 1 }}
                startIcon={<ShoppingCart />}
              >
                {cartItems.some((itemObj) => itemObj.itemId === item.itemId)
                  ? "Go to Cart"
                  : "Add to Cart"}
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => {
                  if (
                    wishlistItems &&
                    wishlistItems.some(
                      (itemObj) => itemObj.itemId === item.itemId
                    )
                  ) {
                    navigate("/wishlist");
                  } else {
                    handleAddToWishlist();
                  }
                }}
                sx={{ px: 4, py: 1 }}
                startIcon={<Favorite />}
              >
                {wishlistItems &&
                wishlistItems.some((itemObj) => itemObj.itemId === item.itemId)
                  ? "Go to Wishlist"
                  : "Add to Wishlist"}
              </Button>
            </Box>

            {/* <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Item ID: {item.itemId}
              </Typography>
            </Box> */}
          </Box>
        </Grid>
      </Grid>

      {/* Customer Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Comment color="primary" sx={{ mr: 2 }} />
          <Typography variant="h5" component="h2" fontWeight="bold">
            Customer Reviews
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Typography
            variant="h3"
            component="span"
            color="primary"
            fontWeight="bold"
            sx={{ mr: 2 }}
          >
            {item.itemRating}
          </Typography>
          <Box>
            <Rating
              value={parseFloat(item.itemRating)}
              precision={0.1}
              readOnly
              size="large"
            />
            <Typography variant="body2" color="text.secondary">
              Based on {reviews.length} reviews
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} key={review.id}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Avatar src={review.userImage} sx={{ mr: 2 }} />
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {review.userName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.purchaseDate}
                      </Typography>
                    </Box>
                    <Rating
                      value={review.starRating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body1">{review.comment}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* You Might Also Like Section */}
      {relatedItems.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Divider sx={{ mb: 4 }} />
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 4, fontWeight: "bold" }}
          >
            You Might Also Like
          </Typography>
          <Grid container spacing={3}>
            {relatedItems.map((relatedItem) => (
              <Grid item key={relatedItem.id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/item/${relatedItem.itemId}`)}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={relatedItem.imageUrl}
                      alt={relatedItem.itemName}
                      sx={{ objectFit: "contain", p: 2, bgcolor: "#f5f5f5" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        noWrap
                      >
                        {relatedItem.itemName}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Rating
                          value={parseFloat(relatedItem.itemRating)}
                          size="small"
                          precision={0.1}
                          readOnly
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({relatedItem.itemRating})
                        </Typography>
                      </Box>
                      <Typography variant="h6" color="primary">
                        ₹{relatedItem.itemPrice}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ItemPage;

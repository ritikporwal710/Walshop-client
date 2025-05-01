import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Grid,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const WishlistItem = ({ item }) => {
  console.log("item aa rahe h ", item);

  const { removeFromWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sx"));
  const navigate = useNavigate();

  const handleRemove = () => {
    console.log(item.itemId);
    removeFromWishlist(item.itemId);
  };

  const handleAddToCart = () => {
    addToCart(item, 1);
  };

  if (isMobile) {
    return (
      <Paper
        elevation={2}
        sx={{ mb: 2, overflow: "hidden", position: "relative" }}
      >
        <Box sx={{ display: "flex", p: 2 }}>
          {/* Product Image */}
          <Box
            component={Link}
            to={`/item/${item.itemId}`}
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              overflow: "hidden",
              flexShrink: 0,
              mr: 2,
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.itemName}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Product Details */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              component={Link}
              to={`/item/${item.itemId}`}
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "inherit",
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {item.itemName}
            </Typography>

            <Chip
              size="small"
              icon={<StarIcon fontSize="small" />}
              label={item.itemRating}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                height: 24,
                fontSize: "0.75rem",
                my: 1,
              }}
            />

            <Typography variant="h6" color="primary" fontWeight="bold">
              ₹{item.itemPrice}
            </Typography>

            <Box sx={{ display: "flex", mt: 1 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<ShoppingCartIcon />}
                onClick={() => {
                  if (
                    cartItems.some(
                      (cartItem) => cartItem.itemId === item.itemId
                    )
                  ) {
                    navigate("/cart");
                  } else {
                    handleAddToCart();
                  }
                }}
                sx={{ mr: 1 }}
              >
                {cartItems.some((cartItem) => cartItem.itemId === item.itemId)
                  ? "Go to Cart"
                  : "Add to Cart"}
              </Button>
              <IconButton color="error" size="small" onClick={handleRemove}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ mb: 2, width: "100%" }}>
      <Grid
        spacing={2}
        sx={{
          p: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "0.4rem",
        }}
      >
        {/* Product Image */}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={2}>
            <Box
              component={Link}
              to={`/item/${item.itemId}`}
              sx={{
                height: 120,
                bgcolor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.itemName}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  width: "10rem",
                  height: "100rem",
                }}
              />
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} sm={5} md={5}>
            <Typography
              component={Link}
              to={`/item/${item.itemId}`}
              variant="h6"
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {item.itemName}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
              <Chip
                size="small"
                icon={<StarIcon fontSize="small" />}
                label={item.itemRating}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  height: 24,
                  fontSize: "0.75rem",
                  mr: 1,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Category: {item.itemCategory}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {item.itemDescription}
            </Typography>
          </Grid>
        </Grid>
        {/* Price */}

        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            sm={2}
            md={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", sm: "center" },
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Typography variant="h6" color="primary" fontWeight="bold">
              ₹{item.itemPrice}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            width: "20rem",
          }}
        >
          {/* Actions */}
          <Grid
            item
            xs={6}
            sm={2}
            md={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-end", sm: "flex-end" },
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={() => {
                if (
                  cartItems.some((cartItem) => cartItem.itemId === item.itemId)
                ) {
                  navigate("/cart");
                } else {
                  handleAddToCart();
                }
              }}
              sx={{ mr: 2 }}
              size={isMobile ? "small" : "medium"}
            >
              {cartItems.some((cartItem) => cartItem.itemId === item.itemId)
                ? "Go to Cart"
                : "Add to Cart"}
            </Button>
            <IconButton color="error" onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WishlistItem;

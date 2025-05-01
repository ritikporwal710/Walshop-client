import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  TextField,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useCart } from "../../context/CartContext";

// Extracted Product Image component
const ProductImage = ({ item }) => (
  <Box
    component={Link}
    to={`/item/${item.itemId}`}
    sx={{
      width: { xs: 80, sm: "100%" },
      height: 80,
      bgcolor: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      borderRadius: 1,
      flexShrink: 0,
      mr: { xs: 2, sm: 0 },
    }}
  >
    <img
      src={item.imageUrl}
      alt={item.itemName}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
      }}
    />
  </Box>
);

// Extracted Product Info component
const ProductInfo = ({ item }) => (
  <Box>
    <Typography
      component={Link}
      to={`/item/${item.itemId}`}
      variant="subtitle1"
      sx={{
        fontWeight: "bold",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {item.itemName}
    </Typography>

    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        mb: 1,
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 1,
      }}
    >
      {item.itemDescription}
    </Typography>
  </Box>
);

// Extracted Quantity Control component
const QuantityControl = ({
  item,
  decreaseQuantity,
  increaseQuantity,
  handleQuantityChange,
  isMobile,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "flex-end" : "center",
    }}
  >
    <IconButton
      size="small"
      onClick={decreaseQuantity}
      disabled={item.quantity <= 1}
    >
      <RemoveIcon fontSize={isMobile ? "small" : "medium"} />
    </IconButton>

    <TextField
      value={item.quantity}
      onChange={handleQuantityChange}
      variant="outlined"
      size="small"
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            textAlign: "center",
            width: "30px",
            padding: isMobile ? "4px" : "6px",
          },
        },
      }}
      sx={{ mx: isMobile ? 0.5 : 1 }}
    />

    <IconButton size="small" onClick={increaseQuantity}>
      <AddIcon fontSize={isMobile ? "small" : "medium"} />
    </IconButton>
  </Box>
);

// Main CartItem component
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      updateQuantity(item.itemId, newQuantity);
    }
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.itemId, item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(item.itemId, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.itemId);
  };

  // Mobile layout
  if (isMobile) {
    return (
      <Paper sx={{ p: 2, mb: 2, position: "relative" }}>
        <Box sx={{ display: "flex" }}>
          <ProductImage item={item} />

          <Box sx={{ flexGrow: 1 }}>
            <ProductInfo item={item} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <Typography variant="subtitle1" color="primary" fontWeight="bold">
                ₹{item.totalPrice * item.quantity}
              </Typography>

              <QuantityControl
                item={item}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                handleQuantityChange={handleQuantityChange}
                isMobile={true}
              />
            </Box>
          </Box>
        </Box>

        <IconButton
          size="small"
          onClick={handleRemove}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,

            
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Paper>
    );
  }

  // Desktop layout
  return (
    <Paper sx={{ p: 1, mb: 1 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        wrap="nowrap"
        sx={{
          maxWidth: "730px",
        }}
      >
        <Grid item sx={{ width: "12%" }}>
          <Box sx={{ width: "80px", height: "80px" }}>
            <ProductImage item={item} />
          </Box>
        </Grid>

        <Grid item sx={{ width: "35%" }}>
          <ProductInfo item={item} />
        </Grid>

        <Grid item sx={{ textAlign: "center", width: "12%" }}>
          <Typography variant="body1">₹{item.totalPrice}</Typography>
        </Grid>

        <Grid item sx={{ width: "18%" }}>
          <QuantityControl
            item={item}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            handleQuantityChange={handleQuantityChange}
            isMobile={false}
          />
        </Grid>

        <Grid item sx={{ textAlign: "center", width: "13%" }}>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            ₹{item.totalPrice * item.quantity}
          </Typography>
        </Grid>

        <Grid item sx={{ textAlign: "center", width: "10%" }}>
          <IconButton color="error" onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;

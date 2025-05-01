import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Rating,
  Chip,
  CardActions,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const WishlistCard = ({ item }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("item", item);
  }, []);

  const handleRemove = () => {
    removeFromWishlist(item.itemId);
  };

  const handleAddToCart = () => {
    addToCart(item, 1);
  };

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",

        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        position: "relative",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
        width: "16rem",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          size="small"
          color="error"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255,255,255,0.8)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
            zIndex: 1,
          }}
          onClick={handleRemove}
        >
          <DeleteIcon />
        </IconButton>

        <CardMedia
          component={Link}
          to={`/item/${item.itemId}`}
          sx={{
            height: 200,
            backgroundSize: "contain",
            bgcolor: "#f5f5f5",
            p: 2,
          }}
          image={item.imageUrl}
          title={item.itemName}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          component={Link}
          to={`/item/${item.itemId}`}
          variant="h6"
          sx={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "inherit",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            minHeight: "3.6em",
          }}
        >
          {item.itemName}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
          <Rating
            value={parseFloat(item.itemRating)}
            precision={0.1}
            size="small"
            readOnly
          />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({item.itemRating})
          </Typography>
        </Box>

        <Chip
          size="small"
          label={item.itemCategory}
          sx={{ mb: 1, textTransform: "capitalize" }}
        />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            minHeight: "2.5em",
            mb: 1,
          }}
        >
          {item.itemDescription}
        </Typography>

        <Typography variant="h6" color="primary" fontWeight="bold">
          ₹{item.itemPrice}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={() => {
            if (cartItems.some((cartItem) => cartItem.itemId === item.itemId)) {
              navigate("/cart");
            } else {
              handleAddToCart();
            }
          }}
        >
          {cartItems.some((cartItem) => cartItem.itemId === item.itemId)
            ? "Go to Cart"
            : "Add to Cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default WishlistCard;

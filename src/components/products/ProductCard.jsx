import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Rating,
  Box,
  Chip,
} from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card
      sx={{
        height: 450,
        // width: "257px",
        // minWidth: "257px",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: 7,
        },
      }}
    >
      <Link
        to={`/item/${product.itemId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box sx={{ position: "relative", height: 200 }}>
          <CardMedia
            component="img"
            height="200"
            image={product.imageUrl}
            alt={product.itemName}
            sx={{ objectFit: "contain", p: 2, bgcolor: "#f5f5f5" }}
          />
          <Box sx={{ position: "absolute", top: 10, right: 10 }}>
            <Chip
              label={
                product.itemCategory.charAt(0).toUpperCase() +
                product.itemCategory.slice(1)
              }
              color="primary"
              size="small"
            />
          </Box>
        </Box>
      </Link>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: 180,
        }}
      >
        <Link
          to={`/item/${product.itemId}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", height: "2.5em", overflow: "hidden" }}
          >
            {product.itemName}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            {product.itemRating > 0 ? (
              <>
                <Rating
                  value={product.itemRating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {product.itemRating}
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
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, height: "3em", overflow: "hidden" }}
          >
            {product.itemDescription}
          </Typography>
        </Link>

        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: "bold", mt: "auto" }}
        >
          ₹{Math.round(product.itemPrice)}
        </Typography>
      </CardContent>

      {/* <Typography variant="body2" color="text.secondary">
        {cartItems.some(item => item.itemId === product.itemId) 
          ? "Matching" 
          : "Not Matching"}
      </Typography> */}

      <CardActions>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={() => {
            if (cartItems.some((item) => item.itemId === product.itemId)) {
              navigate("/cart");
            } else {
              handleAddToCart();
            }
          }}
        >
          {cartItems.some((item) => item.itemId === product.itemId)
            ? "Go to Cart"
            : "Add to Cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

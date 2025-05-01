import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Rating,
  Divider,
  TextField,
  Snackbar,
  Alert,
  Chip,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // If product not found, show suggestion
  if (!product) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Not Found
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          Sorry, the product you are looking for does not exist.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
        </Box>

        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          You might be interested in:
        </Typography>

        <Grid container spacing={3}>
          {products.slice(0, 4).map((suggestedProduct) => (
            <Grid item key={suggestedProduct.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/product/${suggestedProduct.id}`)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={suggestedProduct.image}
                  alt={suggestedProduct.name}
                  sx={{ objectFit: "contain", p: 2, bgcolor: "#f5f5f5" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {suggestedProduct.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₹{suggestedProduct.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Similar products based on category
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Container sx={{ py: 6 }}>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 4 }}
      >
        Back
      </Button>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
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
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Chip
              label={
                product.category.charAt(0).toUpperCase() +
                product.category.slice(1)
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
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.rating} rating)
              </Typography>
            </Box>

            <Typography
              variant="h4"
              color="primary"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              ₹{product.price}
            </Typography>

            <Typography variant="body1" sx={{ mb: 4 }}>
              {product.description}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Quantity:
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  onClick={decreaseQuantity}
                  sx={{ minWidth: "40px" }}
                >
                  <RemoveIcon />
                </Button>
                <TextField
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1, style: { textAlign: "center" } }}
                  sx={{ width: "70px", mx: 1 }}
                />
                <Button
                  variant="outlined"
                  onClick={increaseQuantity}
                  sx={{ minWidth: "40px" }}
                >
                  <AddIcon />
                </Button>
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{ mb: 2 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

      {similarProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 4, fontWeight: "bold" }}
          >
            Similar Products
          </Typography>

          <Grid container spacing={3}>
            {similarProducts.map((similarProduct) => (
              <Grid item key={similarProduct.id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 3,
                    },
                  }}
                  onClick={() => navigate(`/product/${similarProduct.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={similarProduct.image}
                    alt={similarProduct.name}
                    sx={{ objectFit: "contain", p: 2, bgcolor: "#f5f5f5" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {similarProduct.name}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{similarProduct.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {product.name} added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;

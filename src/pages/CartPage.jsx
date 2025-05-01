import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ShoppingBag as ShoppingBagIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { getCartService } from "../Services/AddingCartService";

const CartPage = () => {
  const { cartItems, clearCart, setCartItems } = useCart();
  const { user, isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    getCartItems();
    window.scrollTo(0, 0);
  }, []);

  const getCartItems = async () => {
    try {
      const response = await getCartService();
      setCartItems(response.cartItems);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const EmptyCartView = () => (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Looks like you haven't added any products to your cart yet.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<ShoppingBagIcon />}
          size="large"
        >
          Start Shopping
        </Button>
      </Paper>
    </Container>
  );

  const CartHeader = () => (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Cart ({cartItems.length}{" "}
            {cartItems.length === 1 ? "Item" : "Items"})
          </Typography>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{ textTransform: "none" }}
          >
            Continue Shopping
          </Button>
        </Box>

        <Button
          color="error"
          variant="outlined"
          onClick={clearCart}
          sx={{ display: isMobile ? "none" : "flex" }}
        >
          Clear Cart
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />
    </>
  );

  const CartTableHeader = () => (
    <Paper sx={{ p: 2, mb: 3, bgcolor: "background.paper", width: "100%" }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item sx={{ width: "0%" }}>
          <Typography variant="subtitle2">Product</Typography>
        </Grid>
        <Grid item sx={{ width: "24%" }}>
          <Typography variant="subtitle2">Details</Typography>
        </Grid>
        <Grid item sx={{ width: "1%", textAlign: "center" }}>
          <Typography variant="subtitle2">Price</Typography>
        </Grid>
        <Grid item sx={{ width: "1%", textAlign: "center" }}>
          <Typography variant="subtitle2">Quantity</Typography>
        </Grid>
        <Grid item sx={{ width: "23%", textAlign: "center" }}>
          <Typography variant="subtitle2">Total</Typography>
        </Grid>
      </Grid>
    </Paper>
  );

  const MobileClearCartButton = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mb: 2,
      }}
    >
      <Button color="error" variant="outlined" onClick={clearCart} size="small">
        Clear Cart
      </Button>
    </Box>
  );

  if (cartItems.length === 0) {
    return <EmptyCartView />;
  }

  return (
    <Container sx={{ py: 6 }}>
      <CartHeader />

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {isMobile && <MobileClearCartButton />}
          {!isMobile && <CartTableHeader />}

          {cartItems.map((item) => (
            <CartItem key={item.itemId} item={item} />
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <CartSummary />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;

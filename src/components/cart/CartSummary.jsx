import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Divider,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ShoppingBag as ShoppingBagIcon } from "@mui/icons-material";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const {
    cartItems,
    cartTotalBeforeDiscount,
    cartTotalAfterDiscount,
    discount,
  } = useCart();
  const navigate = useNavigate();

  console.log("discount", discount);

  // Calculate subtotal, shipping, and tax
  const subtotal = cartTotalBeforeDiscount;
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  // const tax = subtotal * 0.1; // 10% tax
  const total = cartTotalAfterDiscount;

  const handleCheckout = async () => {
    // Navigate to checkout page
    navigate("/checkout");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 360, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>

      <Divider sx={{ my: 2 }} />

      <List disablePadding>
        <ListItem disableGutters sx={{ py: 1 }}>
          <ListItemText primary="Subtotal" />
          <Typography variant="body1">₹{subtotal}</Typography>
        </ListItem>

        <ListItem disableGutters sx={{ py: 1 }}>
          <ListItemText
            primary="Shipping"
            secondary={
              subtotal > 100
                ? "Free shipping on orders over ₹100"
                : "Standard shipping"
            }
          />
          <Typography variant="body1">₹{shipping}</Typography>
        </ListItem>

        <ListItem disableGutters sx={{ py: 1 }}>
          <ListItemText primary="Platform Fee" />
          <Typography variant="body1">₹0</Typography>
        </ListItem>

        <ListItem disableGutters sx={{ py: 1 }}>
          <ListItemText primary="Discount" />
          <Typography variant="body1">-₹{discount}</Typography>
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <ListItem disableGutters sx={{ py: 1 }}>
          <ListItemText primary={<Typography variant="h6">Total</Typography>} />
          <Typography variant="h6" color="primary" fontWeight="bold">
            ₹{total}
          </Typography>
        </ListItem>
      </List>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<ShoppingBagIcon />}
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Button>

        <Button
          variant="outlined"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          We accept UPI, Gpay, Phonepe, and Cash on Delivery
        </Typography>
      </Box>
    </Paper>
  );
};

export default CartSummary;

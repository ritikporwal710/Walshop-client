import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../Services/PlaceOrder";

const CheckoutPage = () => {
  const {
    cartItems,
    cartTotal,
    cartTotalBeforeDiscount,
    cartTotalAfterDiscount,
    discount,
    clearCart,
  } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.fullName.split(" ")[0] || "",
    lastName: user?.fullName.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    addressLine1: user?.address || "",
    addressLine2: "",
    city: "",
    state: "Uttar Pradesh",
    pincode: "",
    country: "India",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState({});

  const steps = ["Shipping Information", "Payment Method", "Order Review"];

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (cartItems.length === 0 && !orderPlaced) {
      navigate("/cart");
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [cartItems, navigate, orderPlaced]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation for shipping info
    if (activeStep === 0) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Phone number must be 10 digits";
      if (!formData.addressLine1.trim())
        newErrors.addressLine1 = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
      else if (!/^\d{6}$/.test(formData.pincode))
        newErrors.pincode = "Pincode must be 6 digits";
      if (!formData.country.trim()) newErrors.country = "Country is required";
    }

    // Payment method validation
    if (activeStep === 1 && !formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const response = await placeOrder(cartItems, formData);

        console.log(response);

        setOrderPlaced(true);
        clearCart();
        setActiveStep(3);
      } catch (error) {
        console.error("Error placing order:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/myorders");
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  // Shipping Information Form
  const renderShippingForm = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>

      <Grid container spacing={2} sx={{ gap: 2, width: "100%" }}>
        <Grid xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            size="small"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            size="small"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName}
            required
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            size="small"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            size="small"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone}
            required
            inputProps={{ maxLength: 10 }}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Shipping Address
      </Typography>

      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Address Line 1"
            name="addressLine1"
            size="small"
            value={formData.addressLine1}
            onChange={handleChange}
            margin="normal"
            error={!!errors.addressLine1}
            helperText={errors.addressLine1}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Address Line 2 (Optional)"
            name="addressLine2"
            size="small"
            value={formData.addressLine2}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="City"
            name="city"
            size="small"
            value={formData.city}
            onChange={handleChange}
            margin="normal"
            error={!!errors.city}
            helperText={errors.city}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Pincode"
            name="pincode"
            size="small"
            value={formData.pincode}
            onChange={handleChange}
            margin="normal"
            error={!!errors.pincode}
            helperText={errors.pincode}
            required
            inputProps={{ maxLength: 6 }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="State"
            name="state"
            size="small"
            value={formData.state}
            onChange={handleChange}
            margin="normal"
            error={!!errors.state}
            helperText={errors.state}
            required
            sx={{
              width: "100%",
            }}
          >
            {indianStates.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            size="small"
            value={formData.country}
            onChange={handleChange}
            margin="normal"
            error={!!errors.country}
            helperText={errors.country}
            required
            disabled
          />
        </Grid>
      </Grid>
    </Paper>
  );

  // Payment Method Form
  const renderPaymentMethod = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>

      <FormControl
        component="fieldset"
        error={!!errors.paymentMethod}
        sx={{ width: "100%" }}
      >
        <FormLabel component="legend">Select your payment method</FormLabel>

        <RadioGroup
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          sx={{ mt: 2 }}
        >
          <Paper
            elevation={formData.paymentMethod === "cod" ? 3 : 1}
            sx={{
              p: 2,
              mb: 2,
              border:
                formData.paymentMethod === "cod"
                  ? `2px solid ${theme.palette.primary.main}`
                  : "none",
              borderRadius: 1,
            }}
          >
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="subtitle1">Cash on Delivery</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pay when you receive your order
                  </Typography>
                </Box>
              }
            />
          </Paper>

          <Paper
            elevation={formData.paymentMethod === "card" ? 3 : 1}
            sx={{
              p: 2,
              mb: 2,
              border:
                formData.paymentMethod === "card"
                  ? `2px solid ${theme.palette.primary.main}`
                  : "none",
              borderRadius: 1,
            }}
          >
            <FormControlLabel
              value="card"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="subtitle1">Credit/Debit Card</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pay securely with your card
                  </Typography>
                </Box>
              }
            />
          </Paper>

          <Paper
            elevation={formData.paymentMethod === "upi" ? 3 : 1}
            sx={{
              p: 2,
              mb: 2,
              border:
                formData.paymentMethod === "upi"
                  ? `2px solid ${theme.palette.primary.main}`
                  : "none",
              borderRadius: 1,
            }}
          >
            <FormControlLabel
              value="upi"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="subtitle1">UPI</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pay using Google Pay, PhonePe, Paytm, etc.
                  </Typography>
                </Box>
              }
            />
          </Paper>
        </RadioGroup>

        {errors.paymentMethod && (
          <Typography color="error" variant="caption">
            {errors.paymentMethod}
          </Typography>
        )}
      </FormControl>
    </Paper>
  );

  // Order Summary
  const renderOrderSummary = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>

      <Box sx={{ mb: 3 }}>
        {cartItems.map((item) => (
          <Box
            key={item.itemId}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
              borderBottom: "1px solid #eee",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {item.image && (
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    mr: 2,
                    borderRadius: 1,
                  }}
                />
              )}
              <Box>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Qty: {item.quantity}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" fontWeight="medium">
              ₹{(item.totalPrice * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ my: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">
            ₹{cartTotalBeforeDiscount.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body1">Shipping</Typography>
          <Typography variant="body1">
            ₹{(cartTotalBeforeDiscount > 500 ? 0 : 50).toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body1">Discount</Typography>
          <Typography variant="body1">-₹{discount.toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">
            ₹
            {(
              cartTotalAfterDiscount + (cartTotalAfterDiscount > 500 ? 0 : 50)
            ).toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Shipping Information
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">
          {formData.firstName} {formData.lastName}
        </Typography>
        <Typography variant="body2">
          {formData.addressLine1}
          {formData.addressLine2 && `, ${formData.addressLine2}`}
        </Typography>
        <Typography variant="body2">
          {formData.city}, {formData.state} - {formData.pincode}
        </Typography>
        <Typography variant="body2">{formData.country}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Phone: {formData.phone}
        </Typography>
        <Typography variant="body2">Email: {formData.email}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>

      <Typography variant="body1">
        {formData.paymentMethod === "cod" && "Cash on Delivery"}
        {formData.paymentMethod === "card" && "Credit/Debit Card"}
        {formData.paymentMethod === "upi" && "UPI"}
      </Typography>
    </Paper>
  );

  // Order Confirmation
  const renderOrderConfirmation = () => (
    <Paper
      elevation={3}
      sx={{ p: 3, mb: 4, textAlign: "center", width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          width: "100%",
        }}
      >
        <Box
          sx={{
            bgcolor: "success.main",
            borderRadius: "50%",
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            boxShadow: 2,
          }}
        >
          <CheckIcon fontSize="large" />
        </Box>
      </Box>

      <Typography variant="h4" gutterBottom>
        Thank You For Your Order!
      </Typography>

      <Typography variant="body1" paragraph>
        Your order has been placed successfully. We'll send a confirmation email
        to {formData.email} shortly.
      </Typography>

      <Box
        sx={{
          bgcolor: "background.default",
          p: 2,
          borderRadius: 1,
          my: 3,
          display: "inline-block",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Order #: {Math.floor(100000 + Math.random() * 900000)}
        </Typography>
        <Typography variant="body2">
          Placed on {new Date().toLocaleDateString()}
        </Typography>
      </Box>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleContinueShopping}
          startIcon={<ArrowBackIcon />}
        >
          Continue Shopping
        </Button>
        <Button
          variant="contained"
          onClick={handleViewOrders}
          endIcon={<ArrowForwardIcon />}
        >
          View Orders
        </Button>
      </Box>
    </Paper>
  );

  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderShippingForm();
      case 1:
        return renderPaymentMethod();
      case 2:
        return renderOrderSummary();
      case 3:
        return renderOrderConfirmation();
      default:
        return "Unknown step";
    }
  };

  // OrderSummary for the side panel
  const CheckoutSummary = () => (
    <Paper elevation={3} sx={{ p: 3, position: "sticky", top: 20 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
      </Typography>

      {/* <Divider sx={{ my: 2 }} /> */}

      <Box sx={{ maxHeight: "270px", overflowY: "auto", mb: 2, width: "98%" }}>
        {cartItems.map((item) => (
          <Box
            key={item.itemId}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pb: 1.5,
              mb: 1.5,
              borderBottom: "1px solid #eee",
            }}
          >
            <Box sx={{ display: "flex" }}>
              {item.imageUrl && (
                <Box
                  component="img"
                  src={item.imageUrl}
                  alt={item.itemName}
                  sx={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 1,
                    mr: 1.5,
                  }}
                />
              )}
              <Typography variant="body2" sx={{ maxWidth: "150px" }} noWrap>
                {item.itemName} × {item.quantity}
              </Typography>
            </Box>
            <Typography variant="body2">
              ₹{(item.totalPrice * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ my: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
            width: "98%",
          }}
        >
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">
            ₹{cartTotalBeforeDiscount.toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
            width: "98%",
          }}
        >
          <Typography variant="body2">Shipping</Typography>
          <Typography variant="body2">
            ₹{(cartTotalBeforeDiscount > 500 ? 0 : 50).toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
            width: "98%",
          }}
        >
          <Typography variant="body2">Discount</Typography>
          <Typography variant="body2">-₹{discount.toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
            width: "98%",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Total
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            ₹
            {(
              cartTotalAfterDiscount + (cartTotalAfterDiscount > 500 ? 0 : 50)
            ).toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {activeStep === 2 && (
        <Button
          variant="contained"
          fullWidth
          onClick={handlePlaceOrder}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Place Order"}
        </Button>
      )}
    </Paper>
  );

  if (!isAuthenticated && !orderPlaced) {
    return (
      <Container sx={{ py: 6 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Please log in to proceed with checkout
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/login", { state: { from: "/checkout" } })}
        >
          Log In
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>

      {activeStep < 3 && (
        <Stepper
          activeStep={activeStep}
          sx={{ mb: 4 }}
          alternativeLabel={isMobile}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      {activeStep < 3 && (
        <Grid item xs={12} md={4}>
          <CheckoutSummary />
        </Grid>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {getStepContent(activeStep)}

          {activeStep < 3 && (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="outlined"
                onClick={
                  activeStep === 0 ? () => navigate("/cart") : handleBack
                }
                startIcon={<ArrowBackIcon />}
              >
                {activeStep === 0 ? "Back to Cart" : "Back"}
              </Button>

              {activeStep < 2 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                >
                  Continue
                </Button>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  InputAdornment,
  Snackbar,
  Slide,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import {
  loginService,
  requestOtpService,
  verifyOtpService,
} from "../../Services/SignupService";
import { useCart } from "../../context/CartContext";
import { getCartService } from "../../Services/AddingCartService";
import { useWishlist } from "../../context/WishlistContext";
import { getWishlistService } from "../../Services/WishlistService";
import { getUnreadNotificationsCount } from "../../Services/NotificationService";
// Custom slide transition
const SlideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

const Login = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { setCartItems } = useCart();
  const { setWishlistItems } = useWishlist();

  const { setUser, setIsSubscribed, setUnreadNotifications } = useAuth();
  const navigate = useNavigate();

  const getCartItems = async () => {
    const response = await getCartService();
    setCartItems(response.cartItems);
  };

  const getWishlistItems = async () => {
    const response = await getWishlistService();
    setWishlistItems(response.wishlist);
  };

  const getNotificationsCount = async () => {
    const response = await getUnreadNotificationsCount();
    setUnreadNotifications(response.count);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(""); // Clear any existing errors when switching tabs
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const showWelcomeMessage = (user) => {
    const name = user?.fullName || "User";
    setSnackbarMessage(`Welcome back, ${name}!`);
    setSnackbarOpen(true);

    // Redirect after a short delay to allow the snackbar to be seen
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");

      return;
    }

    try {
      setError("");
      setLoading(true);

      const data = {
        email,
        password,
      };

      const response = await loginService(data);
      console.log("object");
      setUser(response.user);
      setIsSubscribed(response.user.isSubscribed);

      if (response.success) {
        setUser(response.user);
        setIsSubscribed(response.user.isSubscribed);
        await getCartItems();
        await getWishlistItems();
        await getNotificationsCount();

        showWelcomeMessage(response.user);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Failed to log in. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    console.log("clicked request otp");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await requestOtpService(email);
      console.log(response);

      if (response.success) {
        setOtpSent(true);
        setError("");
        setSnackbarMessage("OTP sent successfully! Please check your Email.");
        setSnackbarOpen(true);
      } else {
        setError(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    console.log("clicked verify otp");

    if (!otp || otp.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await verifyOtpService(email, otp);

      if (response.success) {
        setUser(response.user);
        setIsSubscribed(response.user.isSubscribed);
        await getCartItems();
        await getWishlistItems();
        await getNotificationsCount();
        showWelcomeMessage(response.user);
      } else {
        setError(response.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign In
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              width: "100%",
              mb: 3,
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
                height: 3,
              },
            }}
            TabIndicatorProps={{
              style: {
                transition: "all 0.3s ease",
              },
            }}
          >
            <Tab
              label="OTP Login"
              sx={{
                fontWeight: activeTab === 0 ? "bold" : "normal",
                transition: "all 0.2s ease",
              }}
            />
            <Tab
              label="Password Login"
              sx={{
                fontWeight: activeTab === 1 ? "bold" : "normal",
                transition: "all 0.2s ease",
              }}
            />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          {activeTab === 0 ? (
            <Box
              component="form"
              onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                disabled={otpSent}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {otpSent && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="otp"
                  label="Enter OTP"
                  id="otp"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  inputProps={{ maxLength: 6 }}
                />
              )}

              <Button
                type={otpSent ? "submit" : "button"}
                onClick={otpSent ? undefined : handleRequestOtp}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : otpSent ? (
                  "Verify OTP"
                ) : (
                  "Get OTP"
                )}
              </Button>

              {otpSent && (
                <Button
                  fullWidth
                  variant="text"
                  sx={{ mb: 2 }}
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                >
                  Change Email
                </Button>
              )}

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Typography variant="body2" color="primary">
                      {"Don't have an account? Sign Up"}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={handleEmailLogin}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="body2" color="primary">
                      Forgot password?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Typography variant="body2" color="primary">
                      {" Don't have an account? Sign Up"}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" align="center" color="text.secondary">
                For demo, use: user@example.com / password
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={SlideTransition}
        sx={{
          mt: 8,
          mr: 2,
          "& .MuiSnackbarContent-root": {
            minWidth: { xs: "90%", sm: "auto" },
          },
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            boxShadow: 3,
            fontSize: "0.95rem",
            alignItems: "center",
            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;

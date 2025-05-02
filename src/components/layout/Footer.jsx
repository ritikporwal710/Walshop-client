import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  Divider,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { updateUserSubscription } from "../../Services/UserService";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmDialog, setConfirmDialog] = useState(false);

  const { isSubscribed, setIsSubscribed } = useAuth();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubscriptionAction = async () => {
    // If not subscribed yet, subscribe immediately
    if (!isSubscribed) {
      try {
        setIsSubscribed(true);
        await updateUserSubscription(true);
        setSnackbar({
          open: true,
          message: "Successfully subscribed to our newsletter!",
          severity: "success",
        });
      } catch (err) {
        console.error("Subscription update error:", err);
        setSnackbar({
          open: true,
          message: "Failed to update subscription. Please try again.",
          severity: "error",
        });
        setIsSubscribed(false);
      }
    } else {
      // If already subscribed, show confirmation dialog before unsubscribing
      setConfirmDialog(true);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      setIsSubscribed(false);
      await updateUserSubscription(false);
      setSnackbar({
        open: true,
        message: "You have unsubscribed from our newsletter.",
        severity: "success",
      });
      setConfirmDialog(false);
    } catch (err) {
      console.error("Unsubscription error:", err);
      setSnackbar({
        open: true,
        message: "Failed to unsubscribe. Please try again.",
        severity: "error",
      });
      setIsSubscribed(true);
      setConfirmDialog(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        pt: 6,
        pb: 3,
        mt: "auto",
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        {/* Logo and description section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Walshop - Build Your Shop
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: "600px" }}>
            Your one-stop shop for all your shopping needs for your shop. Quality products at
            affordable prices.
          </Typography>
        </Box>

        {/* Main footer content */}
        <Grid container spacing={4}>
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {["Home", "Electronics", "Clothing", "Cart"].map(
                (item, index) => (
                  <Box component="li" key={index} sx={{ mb: 1.5 }}>
                    <Link
                      to={
                        item === "Home"
                          ? "/"
                          : item === "Cart"
                          ? "/cart"
                          : `/category/${item.toLowerCase()}`
                      }
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {item}
                    </Link>
                  </Box>
                )
              )}
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Customer Service
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {[
                { label: "Contact Us", path: "/support" },
                { label: "FAQ", path: "/support" },
                { label: "Shipping Policy", path: "/shipping-policy" },
                { label: "Returns & Exchanges", path: "/returns" },
              ].map((item, index) => (
                <Box component="li" key={index} sx={{ mb: 1.5 }}>
                  <Link
                    to={item.path}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {item.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Contact Info
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <Box
                component="li"
                sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}
              >
                <LocationIcon sx={{ mr: 1, fontSize: "1.2rem", mt: 0.2 }} />
                <Typography variant="body2">
                  310, R.R. Nagar, Bangalore, Karnataka, India
                </Typography>
              </Box>
              <Box
                component="li"
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <PhoneIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                <Typography variant="body2">+91 8439026710</Typography>
              </Box>
              <Box
                component="li"
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <EmailIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                <Typography variant="body2">ritikporwal710@gmail.com</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter Signup */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to receive updates on new arrivals and special
              promotions.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              {/* <TextField
                variant="outlined"
                placeholder="Your email"
                size="small"
                sx={{
                  mr: isMobile ? 0 : 1,
                  mb: isMobile ? 1 : 0,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 1,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                  },
                }}
              /> */}
              <Button
                variant="contained"
                color="secondary"
                endIcon={<SendIcon />}
                sx={{ whiteSpace: "nowrap" }}
                onClick={handleSubscriptionAction}
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Social media section */}
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="subtitle2" gutterBottom>
            Connect With Us
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map(
              (Icon, index) => (
                <IconButton
                  key={index}
                  color="inherit"
                  aria-label="social media"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                  }}
                >
                  <Icon />
                </IconButton>
              )
            )}
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", mb: 3 }} />

        {/* Copyright */}
        <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} Walshop. All rights reserved.
        </Typography>
      </Container>

      {/* Snackbar for subscription notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog for Unsubscribe */}
      <Dialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        aria-labelledby="unsubscribe-dialog-title"
        aria-describedby="unsubscribe-dialog-description"
      >
        <DialogTitle id="unsubscribe-dialog-title">
          Unsubscribe from Newsletter
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="unsubscribe-dialog-description">
            Are you sure you want to unsubscribe from our newsletter? You'll
            miss out on exclusive deals, new product announcements, and special
            offers.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialog(false)}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUnsubscribe}
            color="error"
            variant="contained"
            autoFocus
          >
            Unsubscribe
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Footer;

import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  LocalShipping,
  Schedule,
  Info,
  Public,
  CheckCircle,
} from "@mui/icons-material";

const ShippingPolicy = () => {
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Shipping Policy
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        paragraph
        sx={{ mb: 4 }}
      >
        Information about our shipping methods, delivery times, and policies
      </Typography>

      {/* <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="medium"
            color="primary"
            gutterBottom
          >
            Shipping Methods and Delivery Times
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <LocalShipping sx={{ mr: 1, fontSize: 28 }} />
                    <Typography variant="h6">Standard Shipping</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Delivery within 5-7 business days
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Free for orders over $50
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    $4.99 for orders under $50
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <Schedule sx={{ mr: 1, fontSize: 28 }} />
                    <Typography variant="h6">Express Shipping</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Delivery within 2-3 business days
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    $9.99 for all orders
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available for most locations
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <Public sx={{ mr: 1, fontSize: 28 }} />
                    <Typography variant="h6">International</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Delivery within 7-14 business days
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Starting from $14.99
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Customs fees may apply
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper> */}

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="medium"
            color="primary"
            gutterBottom
          >
            Shipping Policies
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Order Processing"
                secondary="Orders are processed within 1-2 business days after order confirmation. You will receive a tracking number via email once your order ships."
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Delivery Areas"
                secondary="Currently, we only ship to the following cities in India: Etawah, Kanpur and Lucknow."
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Weekend & Holiday Deliveries"
                secondary="Deliveries are not made on Sunday. This day is not counted in the estimated delivery time."
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Shipping Delays"
                secondary="Occasional delays may occur due to carrier issues, weather conditions."
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Address Changes"
                secondary="If you need to change your shipping address, please contact our customer service."
              />
            </ListItem>
          </List>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="medium"
            color="primary"
            gutterBottom
          >
            Tracking Your Order
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1" paragraph>
            Once your order ships, you will receive a confirmation email with
            tracking information. You can also track your order by:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <Info color="primary" />
              </ListItemIcon>
              <ListItemText primary="Logging into your account and viewing your order history" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="primary" />
              </ListItemIcon>
              <ListItemText primary="Contacting our customer support team with your order number" />
            </ListItem>
          </List>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Box>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="medium"
            color="primary"
            gutterBottom
          >
            Questions About Your Shipment?
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1" paragraph>
            If you have any questions about your shipment or our shipping
            policies, please don't hesitate to contact our customer service
            team:
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            • Email: support@global-mart.com
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Phone: +91 8439026710
          </Typography>
          <Typography variant="body1">
            • Hours: Monday-Saturday, 9am-9pm IST
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShippingPolicy;

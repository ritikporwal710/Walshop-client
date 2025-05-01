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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Replay,
  CheckCircle,
  ReportProblem,
  ReceiptLong,
  LocalShipping,
  MoneyOff,
  ExpandMore,
  Info,
} from "@mui/icons-material";

const ReturnsPolicy = () => {
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
        Returns & Refund Policy
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        paragraph
        sx={{ mb: 4 }}
      >
        Our commitment to your satisfaction and guidelines for returns and
        refunds
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="medium"
            color="primary"
            gutterBottom
          >
            Return Process
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={3}>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 4,
              }}
            >
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
                    <ReceiptLong sx={{ mr: 1, fontSize: 28 }} />
                    <Typography variant="h6">Request a Return</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Submit your return request within 7 days of delivery
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contact our customer support team
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Include your order number and reason for return
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 4,
              }}
            >
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
                    <Typography variant="h6">Return Shipping</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Ship the item back in its original packaging
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Return shipping fees may apply
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Free returns for defective items
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 4,
              }}
            >
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
                    <MoneyOff sx={{ mr: 1, fontSize: 28 }} />
                    <Typography variant="h6">Refund Process</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Refunds processed within 1 business days
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Original payment method will be refunded
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Processing time varies by payment method
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="medium"
            color="primary"
            gutterBottom
          >
            Return Policy Guidelines
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Return Eligibility"
                secondary="Items must be returned within 7 days of delivery in original, undamaged condition with all tags and packaging intact."
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Non-Returnable Items"
                secondary="Personal care products, undergarments, and sale items marked as final sale cannot be returned for hygiene and safety reasons."
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Defective Items"
                secondary="Defective products can be returned for a full refund or replacement within 30 days. Please contact customer support with photos of the defect."
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Return Shipping"
                secondary="For standard returns, shipping costs are the responsibility of the customer. Free return shipping is provided for defective or incorrectly shipped items."
              />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Refund Timeline"
                secondary="Once we receive and inspect your return, refunds will be processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution."
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
            Frequently Asked Questions
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Info color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1">
                  Can I exchange my item instead of returning it?
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Yes, you can exchange items for a different size or color,
                subject to availability. Please contact our customer support
                team to initiate an exchange request within 7 days of delivery.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Info color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1">
                  How do I check the status of my return or refund?
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                You can check the status of your return or refund by logging
                into your account and navigating to the Order History section.
                If you have any questions, our customer support team is
                available to assist you.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Info color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1">
                  What if I received the wrong item?
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                If you received an incorrect item, please contact our customer
                support team immediately with your order details and photos of
                the item received. We will arrange for return shipping and send
                you the correct item as soon as possible.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Info color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1">
                  Can I return a gift?
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Yes, gifts can be returned for store credit or exchange within
                14 days of delivery. You'll need the order number or gift
                receipt. The refund will be issued as store credit to the gift
                recipient, not to the original purchaser.
              </Typography>
            </AccordionDetails>
          </Accordion>
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
            Questions About Your Return or Refund Policy?
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1" paragraph>
            If you have any questions about your return or refund policy, please
            contact our customer service team:
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

export default ReturnsPolicy;

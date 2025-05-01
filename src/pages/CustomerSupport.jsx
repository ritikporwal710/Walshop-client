import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  useTheme,
  Snackbar,
  Alert,
  styled,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Chat as ChatIcon,
  ConfirmationNumber as TicketIcon,
  Send as SendIcon,
} from "@mui/icons-material";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Grid from "@mui/material/Grid";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px", // Added gap for spacing between label and input
}));

const CustomerSupport = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("call");
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    issue: "No Selection",
    description: "",
  });
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "system",
      text: "Welcome to customer support! How can we help you today?",
    },
  ]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleTicketChange = (e) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: value,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log("Ticket submitted:", ticketData);
    setSnackbar({
      open: true,
      message: "Your ticket has been submitted successfully!",
      severity: "success",
    });
    // Reset form
    setTicketData({
      name: "",
      email: "",
      issue: "No Selection",
      description: "",
    });
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    // Add user message
    setChatMessages([...chatMessages, { sender: "user", text: chatMessage }]);

    // Simulate response (in a real app, this would come from your backend)
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: "Thank you for your message. Our support team will get back to you shortly.",
        },
      ]);
    }, 1000);

    setChatMessage("");
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const issueOptions = [
    "Product Information",
    "Order Status",
    "Returns & Refunds",
    "Payment Issues",
    "Shipping & Delivery",
    "Technical Support",
    "Account Issues",
    "Other",
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        fontWeight="bold"
      >
        Customer Support
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        paragraph
      >
        We're here to help. Choose how you'd like to connect with our team.
      </Typography>

      {/* Support Options */}
      <Grid
        container
        spacing={4}
        sx={{ mb: 4, mt: 2 }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        <Grid>
          <Card
            sx={{
              height: "100%",
              cursor: "pointer",
              transition: "transform 0.2s",
              //   "&:hover": { transform: "translateY(-1px)" },
              boxShadow: activeTab === "call" ? 4 : 1,
              border:
                activeTab === "call"
                  ? `2px solid ${theme.palette.primary.main}`
                  : "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "300px",
            }}
            onClick={() => setActiveTab("call")}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <PhoneIcon
                sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
              />
              <Typography variant="h6" component="div" gutterBottom>
                Call Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Speak with our support representatives
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card
            sx={{
              height: "100%",
              cursor: "pointer",
              transition: "transform 0.2s",
              //   "&:hover": { transform: "translateY(-5px)" },
              boxShadow: activeTab === "chat" ? 4 : 1,
              border:
                activeTab === "chat"
                  ? `2px solid ${theme.palette.primary.main}`
                  : "none",
            }}
            onClick={() => setActiveTab("chat")}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <ChatIcon
                sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
              />
              <Typography variant="h6" component="div" gutterBottom>
                Live Chat
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Chat with our support team in real-time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card
            sx={{
              height: "100%",
              cursor: "pointer",
              transition: "transform 0.2s",
              //   "&:hover": { transform: "translateY(-5px)" },
              boxShadow: activeTab === "ticket" ? 4 : 1,
              border:
                activeTab === "ticket"
                  ? `2px solid ${theme.palette.primary.main}`
                  : "none",
            }}
            onClick={() => setActiveTab("ticket")}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <TicketIcon
                sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
              />
              <Typography variant="h6" component="div" gutterBottom>
                Raise a Ticket
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Submit a ticket for detailed assistance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Content based on selected option */}
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        {activeTab === "call" && (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <PhoneIcon
              sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Call Our Support Hotline
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color={theme.palette.primary.dark}
              sx={{ my: 3 }}
            >
              +91 8439026710
            </Typography>
            <Typography variant="body1" paragraph>
              Our customer support team is available Monday through Friday, 9:00
              AM to 9:00 PM EST.
            </Typography>
            <Typography variant="body1">
              For urgent matters on weekends, we're available from 10:00 AM to
              6:00 PM EST.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PhoneIcon />}
              sx={{ mt: 3 }}
              component="a"
              href="tel:18007467435"
            >
              Call Now
            </Button>
          </Box>
        )}

        {activeTab === "chat" && (
          <Box
            sx={{ height: "400px", display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h6" gutterBottom>
              Live Chat Support
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                backgroundColor: theme.palette.background.default,
                p: 2,
                borderRadius: 1,
                mb: 2,
              }}
            >
              {chatMessages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                    mb: 2,
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor:
                        msg.sender === "user"
                          ? theme.palette.primary.light
                          : theme.palette.grey[100],
                      color: msg.sender === "user" ? "white" : "inherit",
                      maxWidth: "70%",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body1">{msg.text}</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Box>
          </Box>
        )}

        {activeTab === "ticket" && (
          <Box component="form" onSubmit={handleTicketSubmit}>
            <Typography variant="h6" gutterBottom>
              Submit a Support Ticket
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={ticketData.name}
                  onChange={handleTicketChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="issue-select-label">Issue Type</InputLabel>
                  <Select
                    id="issue"
                    name="issue"
                    value={ticketData.issue}
                    label="Issue Type"
                    onChange={handleTicketChange}
                    required
                    displayEmpty
                    sx={{ width: "100%" }}
                  >
                    <MenuItem value="No Selection" disabled>
                      Select an issue type
                    </MenuItem>
                    {issueOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Describe your issue"
                  name="description"
                  multiline
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<SendIcon />}
                  sx={{ mt: 2 }}
                >
                  Submit Ticket
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* FAQs Section */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          fontWeight={"bold"}
        >
          Frequently Asked Questions
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Accordion sx={{ mb: 2 }} defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography variant="h7" component="span">
                  How do I track my order?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  You can track your order by logging into your account and
                  visiting the "My Orders" section. There you'll find tracking
                  information for all your recent purchases.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq2-content"
                id="faq2-header"
              >
                <Typography variant="h7" component="span">
                  What is your return policy?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  We accept returns within 30 days of purchase. Items must be
                  unused and in original packaging. Please visit our Returns
                  page for detailed instructions.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq3-content"
                id="faq3-header"
              >
                <Typography variant="h7" component="span">
                  How long does shipping take?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Standard shipping typically takes 3-5 business days. Express
                  shipping is available for 1-2 business day delivery.
                  International shipping may take 7-14 business days.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="faq4-content"
                id="faq4-header"
              >
                <Typography variant="h7" component="span">
                  How can I change or cancel my order?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Orders can be changed or canceled within 1 hour of placing
                  them. After that, please contact our customer support team for
                  assistance with modifications.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomerSupport;

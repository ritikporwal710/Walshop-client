import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  IconButton,
  Divider,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SaveIcon from "@mui/icons-material/Save";
import { useAuth } from "../../context/AuthContext";
import { getUserService } from "../../Services/SignupService";
import {
  updateUserProfile,
  updateUserProfileImage,
} from "../../Services/UserService";
// You'll need to create this service
// import { updateUserProfile, getUserProfile } from "../../Services/UserService";

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [initialFormData, setInitialFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    favoriteDeliveryDay: "",
    profileImage: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    favoriteDeliveryDay: "",
    profileImage: null,
  });

  const userData = async () => {
    const response = await getUserService();
    setInitialFormData((prev) => ({
      ...prev,
      name: response.user.fullName,
      email: response.user.email,
      phone: response.user.phone,
      address: response.user.address || "",
      favoriteDeliveryDay: response.user.favouriteDay || "",
      profileImage: response.user.profileImage || null,
    }));
    setFormData((prev) => ({
      ...prev,
      name: response.user.fullName,
      email: response.user.email,
      phone: response.user.phone,
      address: response.user.address || "",
      favoriteDeliveryDay: response.user.favouriteDay || "",
      profileImage: response.user.profileImage || null,
    }));

    if (response.user.profileImage) {
      console.log("response.user.profileImage", response.user.profileImage);
      setPreviewImage(response.user.profileImage);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    userData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await updateUserProfileImage(formData);
      console.log(response.fileUrl);

      // Set the returned image URL to preview and form data
      setPreviewImage(response.fileUrl);
      setProfileImage(response.fileUrl);
      setFormData((prev) => ({
        ...prev,
        profileImage: response.fileUrl,
      }));
    } catch (error) {
      console.error("Error updating profile image:", error);
    }

    // if (file) {
    //   setProfileImage(URL.createObjectURL(file));
    //   setPreviewImage(URL.createObjectURL(file));
    //   setFormData((prev) => ({
    //     ...prev,
    //     profileImage: URL.createObjectURL(file),
    //   }));
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaveLoading(true);
      setError("");
      setSuccess("");

      console.log(formData);
      const response = await updateUserProfile(formData);

      if (response.success) {
        setSuccess("Profile updated successfully!");
      } else {
        setError("Failed to update profile");
      }
    } catch (err) {
      setError("An error occurred while updating your profile");
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          py: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h5"
          variant="h3"
          sx={{
            mb: 7,
            fontWeight: 500,
            color: "#1976d2",
            letterSpacing: "0.02em",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Profile Settings
        </Typography>

        {(error || success) && (
          <Box sx={{ width: "100%", maxWidth: 900, mb: 4 }}>
            {error && (
              <Alert
                severity="error"
                variant="filled"
                sx={{ borderRadius: 2, mb: error && success ? 2 : 0 }}
              >
                {error}
              </Alert>
            )}
            {success && (
              <Alert
                severity="success"
                variant="filled"
                sx={{ borderRadius: 2 }}
              >
                {success}
              </Alert>
            )}
          </Box>
        )}

        <Grid
          container
          spacing={4}
          sx={{ maxWidth: 1200, justifyContent: "center" }}
        >
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 2,
                height: "100%",
                background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
                color: "white",
                overflow: "visible",
                position: "relative",
                zIndex: 2,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pt: 8,
                  pb: 4,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: { xs: "relative", md: "absolute" },
                    top: { md: "-50px" },
                    width: 180,
                    height: 180,
                    mb: { xs: 3, md: 5 },
                  }}
                >
                  <Avatar
                    src={previewImage || "/default-avatar.png"}
                    alt="Profile"
                    sx={{
                      width: 180,
                      height: 180,
                      border: "5px solid #fff",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
                      },
                      backgroundColor: "#e3f2fd",
                    }}
                  />
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="profile-image-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="profile-image-upload">
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 5,
                        right: 5,
                        backgroundColor: "#fff",
                        color: "#1976d2",
                        "&:hover": {
                          backgroundColor: "#1976d2",
                          color: "white",
                        },
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                        transition: "all 0.3s ease",
                        p: 1.2,
                      }}
                      component="span"
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                  </label>
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    paddingTop: "15px",
                    mb: 0,
                    mt: { xs: 0, md: 6 },
                  }}
                >
                  {formData.name || "Your Name"}
                </Typography>

                <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                  {formData.email || "your.email@example.com"}
                </Typography>

                <Divider
                  sx={{
                    width: "80%",
                    borderColor: "rgba(255,255,255,0.2)",
                    my: 1,
                  }}
                />

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, lineHeight: 1.8, opacity: 0.85 }}
                  >
                    Update your profile photo and personal information to help
                    us serve you better.
                  </Typography>

                  {/* <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.3)",
                      },
                      borderRadius: 1,
                      px: 2,
                    }}
                  >
                    Edit Profile
                  </Button> */}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Information Form */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#f5f5f5",
                  py: 3,
                  px: 4,
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="h5" fontWeight={600} color="#212121">
                  Personal Information
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Update your information and delivery preferences
                </Typography>
              </Box>

              <CardContent
                sx={{
                  p: 4,
                  pt: 3,
                }}
              >
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <PersonIcon
                          sx={{
                            mr: 1,
                            // mt: 0.5,
                            opacity: 0.7,
                            color: "#1976d2",
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          color="text.secondary"
                        >
                          Full Name
                        </Typography>
                      </Box>
                      <TextField
                        fullWidth
                        required
                        disabled
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 1, bgcolor: "#ffffff" },
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <EmailIcon
                          sx={{
                            mr: 1,
                            // mt: 0.5,
                            opacity: 0.7,
                            color: "#1976d2",
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          color="text.secondary"
                        >
                          Email Address
                        </Typography>
                      </Box>
                      <TextField
                        fullWidth
                        required
                        disabled
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 1, bgcolor: "#ffffff" },
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <PhoneIcon
                          sx={{
                            mr: 1,
                            // mt: 0.5,
                            opacity: 0.7,
                            color: "#1976d2",
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          color="text.secondary"
                        >
                          Phone Number
                        </Typography>
                      </Box>
                      <TextField
                        disabled
                        fullWidth
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 1, bgcolor: "#ffffff" },
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <CalendarTodayIcon
                          sx={{
                            mr: 1,
                            // mt: 0.5,
                            opacity: 0.7,
                            color: "#1976d2",
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          color="text.secondary"
                        >
                          Preferred Delivery Day
                        </Typography>
                      </Box>
                      <FormControl fullWidth variant="outlined">
                        <Select
                          id="favoriteDeliveryDay"
                          name="favoriteDeliveryDay"
                          value={formData.favoriteDeliveryDay}
                          onChange={handleInputChange}
                          displayEmpty
                          sx={{ borderRadius: 1, bgcolor: "#ffffff" }}
                        >
                          <MenuItem value="" disabled>
                            <em>Select a day</em>
                          </MenuItem>
                          <MenuItem value="monday">Monday</MenuItem>
                          <MenuItem value="tuesday">Tuesday</MenuItem>
                          <MenuItem value="wednesday">Wednesday</MenuItem>
                          <MenuItem value="thursday">Thursday</MenuItem>
                          <MenuItem value="friday">Friday</MenuItem>
                          <MenuItem value="saturday">Saturday</MenuItem>
                          <MenuItem value="sunday">Sunday</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <HomeIcon
                          sx={{
                            mr: 1,
                            // mt: 0.5,
                            opacity: 0.7,
                            color: "#1976d2",
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          color="text.secondary"
                        >
                          Address
                        </Typography>
                      </Box>
                      <TextField
                        fullWidth
                        id="address"
                        name="address"
                        placeholder="Enter your complete address"
                        multiline
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 1, bgcolor: "#ffffff" },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      type="button"
                      variant="outlined"
                      sx={{
                        borderRadius: 1,
                        mr: 2,
                        px: 3,
                        borderColor: "#bdbdbd",
                        color: "#757575",
                        "&:hover": {
                          borderColor: "#9e9e9e",
                          bgcolor: "#f5f5f5",
                        },
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                      startIcon={saveLoading ? undefined : <SaveIcon />}
                      sx={{
                        borderRadius: 1,
                        px: 4,
                        py: 1.2,
                        backgroundColor: "#1976d2",
                        "&:hover": {
                          backgroundColor: "#1565c0",
                          boxShadow: "0 4px 10px rgba(25, 118, 210, 0.4)",
                        },
                      }}
                      disabled={saveLoading}
                    >
                      {saveLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;

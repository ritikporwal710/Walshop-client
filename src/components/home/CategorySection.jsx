import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  Divider,
  Fade,
  Paper,
} from "@mui/material";
import {
  ArrowForward as ArrowForwardIcon,
  Devices as ElectronicsIcon,
  CheckroomOutlined as ClothingIcon,
  // ShoesOutlined as ShoesIcon,
  WatchOutlined as AccessoriesIcon,
  IceSkating,
} from "@mui/icons-material";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://placehold.co/400x200/3498db/FFFFFF?text=Electronics",
    description: "Discover the latest gadgets and electronics",
    icon: <ElectronicsIcon />,
    color: "#1976d2",
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://placehold.co/400x200/27ae60/FFFFFF?text=Clothing",
    description: "Trendy and comfortable clothing for all seasons",
    icon: <ClothingIcon />,
    color: "#2e7d32",
  },
  {
    id: "shoes",
    name: "Shoes",
    image: "https://placehold.co/400x200/e74c3c/FFFFFF?text=Shoes",
    description: "Stylish and comfortable footwear for every occasion.",
    icon: <IceSkating />,

    color: "#d32f2f",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://placehold.co/400x200/f39c12/FFFFFF?text=Accessories",
    description: "Complete your look with our accessories",
    icon: <AccessoriesIcon />,
    color: "#ed6c02",
  },
];

const CategorySection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(180deg, #f9f9f9 0%, #ffffff 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Box sx={{ mb: 5, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  // content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80px",
                  height: "4px",
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "2px",
                },
              }}
            >
              Shop by Category
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                maxWidth: "600px",
                mx: "auto",
                mt: 2,
              }}
            >
              Explore our wide range of products across different categories
            </Typography>
          </Box>
        </Fade>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            flexWrap: { xs: "wrap", md: "wrap" }, // Changed from "nowrap" to "wrap" for md screens
            overflow: "visible",
            justifyContent: "center",
          }}
        >
          {categories.map((category, index) => (
            <Fade
              in={true}
              style={{
                transitionDelay: `${index * 100}ms`,
                transformOrigin: "center",
              }}
              timeout={800}
              key={category.id}
            >
              <Paper
                elevation={0}
                sx={{
                  flex: {
                    xs: "1 1 100%",
                    sm: "1 1 calc(50% - 16px)",
                    md: "1 1 calc(50% - 16px)", // Changed from 25% to 50% for better md screen layout
                    lg: "1 1 calc(25% - 16px)", // Added lg breakpoint to maintain original 4-column layout on large screens
                  },
                  minWidth: { xs: "100%", sm: "250px" },
                  maxWidth: { md: "calc(50% - 16px)", lg: "calc(25% - 16px)" }, // Added maxWidth constraints
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "all 0.2s ease-in-out",
                  border: "1px solid rgba(0,0,0,0.08)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 16px 24px rgba(0,0,0,0.1)",
                    "& .category-image": {
                      transform: "scale(1.05)",
                    },
                  },
                }}
              >
                <Box sx={{ position: "relative", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={category.image}
                    alt={category.name}
                    className="category-image"
                    sx={{
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      color: category.color,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    {category.icon}
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: "bold",
                      color: category.color,
                      mb: 1,
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Divider sx={{ my: 1.5, opacity: 0.6 }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, minHeight: "40px" }}
                  >
                    {category.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/category/${category.id}`}
                    endIcon={<ArrowForwardIcon />}
                    variant="outlined"
                    fullWidth
                    sx={{
                      mt: 1,
                      py: 1,
                      borderRadius: "8px",
                      color: category.color,
                      borderColor: category.color,
                      "&:hover": {
                        backgroundColor: `${category.color}10`,
                        borderColor: category.color,
                      },
                    }}
                  >
                    Browse Products
                  </Button>
                </CardContent>
              </Paper>
            </Fade>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CategorySection;

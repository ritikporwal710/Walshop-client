import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  IconButton,
  Chip,
} from "@mui/material";
import {
  ShoppingBag as ShoppingBagIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  LocalOffer as LocalOfferIcon,
} from "@mui/icons-material";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const carouselItems = [
    {
      id: 1,
      title: "Summer Collection Sale",
      description:
        "Get up to 50% off on our latest collection of products. Shop now for the best deals!",
      primaryButton: { text: "Shop Now", link: "/category/electronics" },
      secondaryButton: {
        text: "Explore",
        link: "/category/clothing",
      },
      discount: "50% OFF",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      backgroundColor: "rgba(21, 101, 192, 0.8)",
      highlight: "Limited Time Offer!",
    },
    {
      id: 2,
      title: "New Electronics Arrivals",
      description:
        "Discover the latest tech gadgets with exclusive launch offers. Limited time Offers!",
      primaryButton: { text: "View Deals", link: "/category/electronics" },
      secondaryButton: { text: "See All", link: "/category/electronics" },
      discount: "40% OFF",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
      backgroundColor: "rgba(230, 81, 0, 0.8)",
      highlight: "New Arrivals!",
    },
    {
      id: 3,
      title: "Fashion Week Special",
      description:
        "Trendy outfits for all occasions with free shipping on orders above ₹50.",
      primaryButton: { text: "Fashion", link: "/category/clothing" },
      secondaryButton: { text: "Trends", link: "/category/clothing" },
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
      backgroundColor: "rgba(104, 159, 56, 0.8)",
      highlight: "Free Shipping!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // Auto rotate every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const currentItem = carouselItems[currentIndex];

  return (
    <Box
      sx={{
        color: "primary.contrastText",
        position: "relative",
        overflow: "hidden",
        height: { xs: "85vh", md: "82vh", lg: "80vh" },
        backgroundImage: `linear-gradient(to right, ${currentItem.backgroundColor}, rgba(0, 0, 0, 0.7)), url(${currentItem.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid container alignItems="center" sx={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={{
              animation: `${fadeIn} 0.4s ease-out`,
              p: { xs: 3, md: 0 },
            }}
            // size={{ xs: 12, sm: 6, md: 7, lg: 6 }}
          >
            <Chip
              label={currentItem.discount}
              color="error"
              icon={<LocalOfferIcon />}
              sx={{
                mb: 2,
                fontWeight: "bold",
                fontSize: "1rem",
                p: 0.5,
              }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: "600",
                mb: 1,
                color: "#FFD700",
                textTransform: "uppercase",
                letterSpacing: 1,
                animation: `${slideUp} 0.6s ease-out`,
              }}
            >
              {currentItem.highlight}
            </Typography>

            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
                animation: `${slideUp} 0.7s ease-out`,
              }}
            >
              {currentItem.title}
            </Typography>

            <Typography
              variant="h6"
              component="p"
              gutterBottom
              sx={{
                mb: 4,
                opacity: 0.9,
                maxWidth: "85%",
                lineHeight: 1.6,
                animation: `${slideUp} 0.8s ease-out`,
              }}
            >
              {currentItem.description}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                mb: 4,
                animation: `${slideUp} 0.9s ease-out`,
              }}
            >
              <Button
                component={Link}
                to={currentItem.primaryButton.link}
                variant="contained"
                size="large"
                startIcon={<ShoppingBagIcon />}
                sx={{
                  backgroundColor: "background.paper",
                  color: "primary.main",
                  fontWeight: "bold",
                  py: 1.5,
                  px: 3,
                  "&:hover": {
                    backgroundColor: "background.paper",
                    opacity: 0.9,
                    transform: "translateY(-3px)",
                    transition: "transform 0.3s ease",
                  },
                }}
              >
                {currentItem.primaryButton.text}
              </Button>

              <Button
                component={Link}
                to={currentItem.secondaryButton.link}
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "background.paper",
                  color: "background.paper",
                  py: 1.5,
                  px: 3,
                  // my: 10,
                  "&:hover": {
                    borderColor: "background.paper",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "translateY(-3px)",
                    transition: "transform 0.3s ease",
                  },
                }}
              >
                {currentItem.secondaryButton.text}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Navigation Arrows */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: { lg: -40, md: 10, sm: 0, xs: 0 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            width: { xs: 40, md: 50 },
            height: { xs: 40, md: 50 },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            },
            zIndex: 2,
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: { xs: 10, md: 20 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            width: { xs: 40, md: 50 },
            height: { xs: 40, md: 50 },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            },
            zIndex: 2,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Container>

      {/* Carousel Indicators */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: 24,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        {carouselItems.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              height: 4,
              width: index === currentIndex ? 32 : 16,
              borderRadius: 2,
              mx: 0.5,
              cursor: "pointer",
              backgroundColor:
                index === currentIndex ? "white" : "rgba(255, 255, 255, 0.5)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Hero;

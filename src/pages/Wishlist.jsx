import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Divider,
  Paper,
  Grid,
  CircularProgress,
  useMediaQuery,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ArrowBack as ArrowBackIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";
import { useWishlist } from "../context/WishlistContext";
import WishlistItem from "../components/wishlist/WishlistItem";
import WishlistCard from "../components/wishlist/WishlistCard";
import { getWishlistService } from "../Services/WishlistService";

const Wishlist = () => {
  const { wishlistItems, clearWishlist, loading, setWishlistItems } =
    useWishlist();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  useEffect(() => {
    window.scrollTo(0, 0);
    gettingWishlistItems();

    // window.scrollTo(0, 0);
  }, []);

  const gettingWishlistItems = async () => {
    try {
      const response = await getWishlistService();
      console.log("response", response);
      setWishlistItems(response.wishlist);
      //   window.scrollTo(0, 0);
    } catch (error) {
      console.error("Failed to fetch wishlist items:", error);
    }
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const EmptyWishlistView = () => (
    <Container sx={{ py: 4, maxWidth: { xs: "100%", md: "1100px" } }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Wishlist
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
        <FavoriteBorderIcon
          sx={{ fontSize: 64, color: "primary.light", mb: 2 }}
        />
        <Typography variant="h6" gutterBottom>
          Your wishlist is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Looks like you haven't added any products to your wishlist yet.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          size="large"
        >
          Explore Products
        </Button>
      </Paper>
    </Container>
  );

  const WishlistHeader = () => (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            My Wishlist ({wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "Item" : "Items"})
          </Typography>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{ textTransform: "none", mb: isMobile ? 2 : 0 }}
          >
            Continue Shopping
          </Button>
        </Box>

        <Box
          sx={{ display: "flex", alignItems: "center", mt: isMobile ? 2 : 0 }}
        >
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
            size="small"
            sx={{ mr: 2 }}
          >
            <ToggleButton value="grid" aria-label="grid view">
              <Tooltip title="Grid View">
                <ViewModuleIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <Tooltip title="List View">
                <ViewListIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>

          {wishlistItems.length > 0 && (
            <Button color="error" variant="outlined" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />
    </>
  );

  if (loading) {
    return (
      <Container
        sx={{
          py: 10,
          textAlign: "center",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Container>
    );
  }
  if (wishlistItems.length === 0) {
    return <EmptyWishlistView />;
  }
  console.log("wishlistItems not coming", wishlistItems);

  return (
    <Container sx={{ py: 4, maxWidth: { xs: "100%", md: "1200px" } }}>
      <WishlistHeader />

      {viewMode === "list" ? (
        <Box sx={{ width: "100%" }}>
          {wishlistItems.map((item) => (
            <WishlistItem key={item.itemId} item={item} />
          ))}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid item key={item.itemId} xs={12} sm={6} md={4} lg={3}>
              <WishlistCard key={item.itemId} item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Wishlist;

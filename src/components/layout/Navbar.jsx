import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  InputBase,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  ListItemIcon,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  Notifications as NotificationsIcon,
  PersonAdd,
  Login,
  Logout,
  ShoppingBag,
  HelpOutline,
  Person,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getUserService, logoutService } from "../../Services/SignupService";
import { getCartService } from "../../Services/AddingCartService";
import { useSearch } from "../../context/SearchContext";
import { getWishlistService } from "../../Services/WishlistService";
import { getUnreadNotificationsCount } from "../../Services/NotificationService";
// Search bar styles
const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const {
    isAuthenticated,
    logout: _,
    user: userObj,
    setUser,
    setIsSubscribed,
    unreadNotifications,
    setUnreadNotifications,
  } = useAuth();
  const { itemCount, setCartItems } = useCart();
  const { wishlistItems, setWishlistItems } = useWishlist();
  const { searchQuery, setSearchQuery, handleSearch } = useSearch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  // const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleProfileMenuClose = () => {
  //   // Add a small delay to allow for hover interactions
  //   setTimeout(() => {
  //     // Only close if the mouse isn't over the menu
  //     if (!anchorEl || !anchorEl.contains(document.activeElement)) {
  //       setAnchorEl(null);
  //     }
  //   }, 5000);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const logouting = async () => {
    await logoutService();
    setUser(null);
    setIsSubscribed(false);
    // isAuthenticated(false);
  };

  const handleLogout = () => {
    logouting();
    handleMenuClose();
    setCartItems([]);
    // navigate("/");
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  //     setSearchQuery("");
  //   }
  // };

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Electronics", link: "/category/electronics" },
    { text: "Clothing", link: "/category/clothing" },
    { text: "Shoes", link: "/category/shoes" },
    { text: "Accessories", link: "/category/accessories" },
    { text: "Help", link: "/support" },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const getUser = async () => {
    const response = await getUserService();
    setUser(response.user);
    setIsSubscribed(response.user.isSubscribed);
  };

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

  useEffect(() => {
    const page = window.location.pathname;
    if (page !== "/login" && page !== "/signup") {
      getUser();
      getCartItems();
      getWishlistItems();
      getNotificationsCount();
    }
  }, []);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, [window.location.pathname]);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      keepMounted
    >
      {isAuthenticated
        ? [
            <MenuItem
              key="profile"
              onClick={() => {
                handleMenuClose();
                navigate("/profile");
              }}
            >
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>,
            <MenuItem
              key="wishlist"
              onClick={() => {
                handleMenuClose();
                navigate("/wishlist");
              }}
            >
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              My Wishlist{" "}
              {wishlistItems.length > 0 && `(${wishlistItems.length})`}
            </MenuItem>,
            <MenuItem
              key="support"
              onClick={() => {
                handleMenuClose();
                navigate("/support");
              }}
            >
              <ListItemIcon>
                <HelpOutline fontSize="small" />
              </ListItemIcon>
              Help
            </MenuItem>,
            <MenuItem
              key="orders"
              onClick={() => {
                handleMenuClose();
                navigate("/myorders");
              }}
            >
              <ListItemIcon>
                {/* <ShoppingBagIcon fontSize="small" /> */}
                <ShoppingBag fontSize="small" />
              </ListItemIcon>
              My Orders
            </MenuItem>,
            <MenuItem
              key="notifications"
              onClick={() => {
                handleMenuClose();
                navigate("/notifications");
              }}
            >
              <ListItemIcon>
                <NotificationsIcon fontSize="small" />
              </ListItemIcon>
              Notifications{" "}
              {unreadNotifications > 0 && `(${unreadNotifications})`}
            </MenuItem>,
            <MenuItem
              key="logout"
              onClick={() => {
                handleMenuClose();
                handleLogout();
                navigate("/");
              }}
            >
              <ListItemIcon>
                {/* <LogoutIcon fontSize="small" /> */}
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>,
          ]
        : [
            <MenuItem
              key="login"
              onClick={() => {
                handleMenuClose();
                navigate("/login");
              }}
            >
              <ListItemIcon>
                {/* <LoginIcon fontSize="small" /> */}
                <Login fontSize="small" />
              </ListItemIcon>
              Login
            </MenuItem>,
            <MenuItem
              key="signup"
              onClick={() => {
                handleMenuClose();
                navigate("/signup");
              }}
            >
              <ListItemIcon>
                {/* <PersonAddIcon fontSize="small" /> */}
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Sign Up
            </MenuItem>,
          ]}
    </Menu>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontWeight: 700,
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            {/* ShopEasy
             */}
            Walshop - Build Your Shop
{/*   //             <span style={{ display: { xs: 'none', md: 'inline' } }}>Walshop - Build Your Shop</span>
  // <span style={{ display: { xs: 'inline', md: 'none' } }}>Walshop</span> */}
          </Typography>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                mx: 4,
                "& a": {
                  mx: 1,
                  color: "text.primary",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  borderBottom: "2px solid transparent",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderBottomColor: "primary.main",
                  },
                },
              }}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.link}
                  style={{
                    borderBottomColor:
                      item.link === activeLink
                        ? theme.palette.primary.main
                        : "transparent",
                  }}
                >
                  {item.text}
                </Link>
              ))}
            </Box>
          )}

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <SearchBar sx={{ maxWidth: "250px", width: "100%" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <form onSubmit={handleSearch}>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: "calc(100% - 90px)" }}
                />
              </form>
            </SearchBar>
          </Box>

          <Box sx={{ display: "flex" }}>
            {isAuthenticated ? (
              <>
                <IconButton
                  component={Link}
                  to="/notifications"
                  color="inherit"
                  sx={{ ml: { xs: 0, md: -15 } }}
                >
                  <Badge
                    badgeContent={unreadNotifications ? unreadNotifications : 0}
                    color="error"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  component={Link}
                  to="/wishlist"
                  color="inherit"
                  sx={{ ml: { xs: 0, md: 0 } }}
                >
                  <Badge
                    // badgeContent={wishlistItems ? wishlistItems.length : 0}
                    color="error"
                  >
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  component={Link}
                  to="/cart"
                  color="inherit"
                  sx={{ ml: { xs: 0, md: 0 } }}
                >
                  <Badge badgeContent={itemCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  // onMouseLeave={handleProfileMenuClose}
                  color="inherit"
                  // sx={{ ml: { xs: 0, md: 0 } }}
                  sx={{
                    "&:hover": {
                      transition: "transform 0.3s ease",
                      color: "#46df4b",
                    },
                  }}
                >
                  <PersonIcon />
                </IconButton>
              </>
            ) : (
              <IconButton
                size="large"
                edge="end"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{
                  "&:hover": {
                    transition: "transform 0.3s ease",
                    color: "#46df4b",
                  },
                }}
              >
                <PersonIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;

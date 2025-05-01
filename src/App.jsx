import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import Profile from "./components/profile/Profile";
import MyOrder from "./components/orderPage/MyOrder";
import ItemPage from "./pages/ItemPage";
import CheckoutPage from "./pages/CheckoutPage";
import Wishlist from "./pages/Wishlist";
import CustomerSupport from "./pages/CustomerSupport";
import Notification from "./pages/Notification";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnsPolicy from "./pages/ReturnsPolicy";
import { SearchProvider } from "./context/SearchContext";
// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#4791db",
      dark: "#115293",
    },
    secondary: {
      main: "#f50057",
      light: "#ff4081",
      dark: "#c51162",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path="/product/:id"
                      element={<ProductDetailPage />}
                    />
                    <Route path="/item/:id" element={<ItemPage />} />
                    <Route
                      path="/category/:categoryId"
                      element={<CategoryPage />}
                    />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPasswordPage />}
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/myorders" element={<MyOrder />} />
                    <Route path="/support" element={<CustomerSupport />} />
                    <Route path="/notifications" element={<Notification />} />
                    <Route
                      path="/shipping-policy"
                      element={<ShippingPolicy />}
                    />
                    <Route path="/returns" element={<ReturnsPolicy />} />
                  </Routes>
                </Layout>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

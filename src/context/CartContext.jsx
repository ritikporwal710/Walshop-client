import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addToCartService,
  getCartService,
  removeFromCartService,
  clearCartService,
} from "../Services/AddingCartService";
import { getAvailableDiscountsService } from "../Services/DiscountService";
const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalBeforeDiscount, setCartTotalBeforeDiscount] = useState(0);
  const [cartTotalAfterDiscount, setCartTotalAfterDiscount] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
      }
    }
  }, []);

  const getDiscountsService = async (total) => {
    const response = await getAvailableDiscountsService();

    console.log(
      "working",
      response.data[0].minAmount,
      response.data[0].discountPercent
    );

    console.log("total", total >= response.data[0].minAmount);

    if (total >= response.data[0].minAmount) {
      console.log("trueeeeeeeeeeeeee");
      const discount = total * (response.data[0].discountPercent / 100);
      const discountedTotal = total - discount;
      setCartTotalAfterDiscount(discountedTotal);
      setDiscount(discount);
    } else {
      setCartTotalAfterDiscount(total);
    }
  };

  // Save cart to localStorage when it changes
  useEffect(() => {
    // localStorage.setItem("cart", JSON.stringify(cartItems));

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.totalPrice * item.quantity,
      0
    );

    setCartTotalBeforeDiscount(total);

    getDiscountsService(total);
  }, [cartItems]);

  // useEffect(() => {
  //   getCartItems();
  // }, [setCartItems]);

  const addToCartItem = async (product, quantity = 1) => {
    await addToCartService(product, quantity);
    getCartItems();
  };
  const getCartItems = async () => {
    const response = await getCartService();
    setCartItems(response.cartItems);
  };

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    addToCartItem(product, quantity);
    // getCartItems();
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    const product = cartItems.find((item) => item.itemId === productId);
    if (product) {
      await removeFromCartService(productId);
    }
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.itemId !== productId)
    );
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.itemId === productId ? { ...item, quantity } : item
        )
      );

      const product = cartItems.find((item) => item.itemId === productId);
      if (product) {
        await addToCartService(product, quantity);
      }
    }
  };

  // Clear cart
  const clearCart = async () => {
    setCartItems([]);
    await clearCartService();
  };

  const value = {
    cartItems,
    setCartItems,
    cartTotalBeforeDiscount,
    cartTotalAfterDiscount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    discount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addToWishlistService,
  clearWishlistService,
  getWishlistService,
  removeFromWishlistService,
} from "../Services/WishlistService";

const WishlistContext = createContext(undefined);

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlistItems = async () => {
    try {
      setLoading(true);
      const response = await getWishlistService();
      console.log(response.wishlist);
      if (response && response.wishlist) {
        setWishlistItems(response.wishlist);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist items:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (itemId) => {
    console.log(itemId);
    try {
      await removeFromWishlistService(itemId);
      setWishlistItems(wishlistItems.filter((item) => item.itemId !== itemId));
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
    }
  };

  const clearWishlist = async () => {
    try {
      await clearWishlistService();
      setWishlistItems([]);
    } catch (error) {
      console.error("Failed to clear wishlist:", error);
    }
  };

  const addToWishlist = async (itemId) => {
    try {
      await addToWishlistService(itemId);
      fetchWishlistItems();
    } catch (error) {
      console.error("Failed to add item to wishlist:", error);
    }
  };

  // useEffect(() => {
  //   fetchWishlistItems();
  // }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        setWishlistItems,
        removeFromWishlist,
        addToWishlist,
        clearWishlist,
        loading,
        fetchWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

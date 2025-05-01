import { createContext, useContext, useState } from "react";

const SearchContext = createContext(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

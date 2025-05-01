const products = [
  {
    id: 1,
    name: "Premium Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 249.99,
    category: "electronics",
    image: "https://placehold.co/300x300/3498db/FFFFFF?text=Headphones",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch",
    description:
      "Fitness tracker with heart rate monitor and smart notifications",
    price: 199.99,
    category: "electronics",
    image: "https://placehold.co/300x300/3498db/FFFFFF?text=SmartWatch",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    description: "True wireless earbuds with premium sound quality",
    price: 129.99,
    category: "electronics",
    image: "https://placehold.co/300x300/3498db/FFFFFF?text=Earbuds",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Designer T-shirt",
    description: "Premium cotton t-shirt with modern design",
    price: 39.99,
    category: "clothing",
    image: "https://placehold.co/300x300/27ae60/FFFFFF?text=T-shirt",
    rating: 4.0,
  },
  {
    id: 5,
    name: "Slim Fit Jeans",
    description: "Comfortable slim fit jeans for everyday wear",
    price: 59.99,
    category: "clothing",
    image: "https://placehold.co/300x300/27ae60/FFFFFF?text=Jeans",
    rating: 4.1,
  },
  {
    id: 6,
    name: "Running Shoes",
    description: "Lightweight running shoes for maximum performance",
    price: 89.99,
    category: "shoes",
    image: "https://placehold.co/300x300/e74c3c/FFFFFF?text=Shoes",
    rating: 4.6,
  },
  {
    id: 7,
    name: "Backpack",
    description: "Durable backpack with laptop compartment",
    price: 49.99,
    category: "accessories",
    image: "https://placehold.co/300x300/f39c12/FFFFFF?text=Backpack",
    rating: 4.4,
  },
  {
    id: 8,
    name: "Sunglasses",
    description: "Polarized sunglasses with UV protection",
    price: 79.99,
    category: "accessories",
    image: "https://placehold.co/300x300/f39c12/FFFFFF?text=Sunglasses",
    rating: 4.2,
  },
];



const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

const getProductsByCategory = (category) => {
  return products.filter((product) => product.category === category);
};

export { products, getProductById, getProductsByCategory };

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://jairozon.onrender.com";

axios.defaults.withCredentials = true; // needed if backend uses cookies

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);

  // --- Fetch Admin ---
  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("/admin/is-auth");
      setIsAdmin(!!data.success);
    } catch {
      setIsAdmin(false);
    }
  };

  // --- Fetch User ---
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/user/is-auth");
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        // Only clear user if we get a definitive "not authenticated" response
        if (data && !data.success) {
          setUser(null);
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      // Only clear user on 401/403 errors, not network errors
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setUser(null);
        localStorage.removeItem("user");
      }
      // For network errors, keep existing user state
    } finally {
      setAuthLoading(false);
    }
  };

  // --- Fetch Books ---
  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("/book/get-books");
      if (data.success) setBooksData(data.books);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // --- Fetch Cart ---
  const fetchCart = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get("/cart/get");
      if (data.success) setCart(data.cartItems || []);
    } catch (error) {
      console.error("Failed to fetch cart");
    }
  };

  // --- Cart Functions ---
  const addToCart = async (book) => {
    const existingBook = cart.find((item) => item._id === book._id);
    const newCart = existingBook
      ? cart.map((item) =>
        item._id === book._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      : [...cart, { ...book, quantity: 1 }];

    setCart(newCart);

    if (user) {
      try {
        await axios.post("/cart/add", { productId: book._id, quantity: 1 });
      } catch (error) {
        console.error("Failed to sync cart");
      }
    }

    toast.success("Book added to cart");
  };

  const removeFromCart = async (bookId) => {
    const newCart = cart
      .map((item) =>
        item._id === bookId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(newCart);

    if (user) {
      try {
        await axios.post("/cart/remove", { productId: bookId });
      } catch (error) {
        console.error("Failed to sync cart");
      }
    }

    toast.success("Book removed from cart");
  };

  const updateCart = async (productId, newQty) => {
    const newCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQty } : item
    );

    setCart(newCart);

    if (user) {
      try {
        await axios.post("/cart/update", { productId, quantity: newQty });
      } catch (error) {
        console.error("Failed to sync cart");
      }
    }

    toast.success("Cart updated");
  };

  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const totalCartPrice = cart.reduce(
    (t, i) => t + i.offerPrice * i.quantity,
    0
  );

  // --- Logout ---
  const logout = async () => {
    try {
      await axios.post("/user/logout");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setUser(null);
      setCart([]); // Clear cart on logout
      delete axios.defaults.headers.common["Authorization"];
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // --- Restore user/token on refresh ---
  useEffect(() => {
    const initializeApp = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          localStorage.removeItem("user");
        }
      }

      // Always try to fetch user from server to verify session
      await fetchUser();
      await fetchBooks();
      await fetchAdmin();
    };

    initializeApp();
  }, []);

  // Fetch cart when user changes
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const value = {
    navigate,
    user,
    setUser,
    axios,
    isAdmin,
    setIsAdmin,
    booksData,
    setBooksData,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    cart,
    removeFromCart,
    updateCart,
    cartCount,
    totalCartPrice,
    authLoading,
    logout, // added
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

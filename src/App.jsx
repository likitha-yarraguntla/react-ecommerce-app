
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useState } from "react";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [theme, setTheme] =
    useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "dark"
        ? "light"
        : "dark"
    );
  };

  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",

          background:
            theme === "dark"
              ? "#0f172a"
              : "#f8fafc",

          color:
            theme === "dark"
              ? "white"
              : "#0f172a",
        }}
      >
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Register
                theme={theme}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                theme={theme}
              />
            }
          />

          <Route
            path="/forgot-password"
            element={
              <ForgotPassword
                theme={theme}
              />
            }
          />

          <Route
            path="/admin"
            element={
              <AdminDashboard
                theme={theme}
              />
            }
          />

          <Route
            path="/products"
            element={
              <Products
                theme={theme}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                theme={theme}
              />
            }
          />

          <Route
            path="/orders"
            element={
              <Orders
                theme={theme}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                theme={theme}
              />
            }
          />

          <Route
            path="/wishlist"
            element={
              <Wishlist
                theme={theme}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

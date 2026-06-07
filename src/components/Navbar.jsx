import { Link, useNavigate } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const token = localStorage.getItem("token");

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");

    alert("Logged Out ✅");

    navigate("/login");

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const linkStyle = {
    textDecoration: "none",
    fontWeight: "bold",
    color:
      theme === "dark"
        ? "white"
        : "#0f172a",
    transition: "0.3s",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "18px 40px",
        background:
          theme === "dark"
            ? "linear-gradient(90deg,#0f172a,#1e293b)"
            : "linear-gradient(90deg,#e2e8f0,#f8fafc)",
        color:
          theme === "dark"
            ? "white"
            : "#0f172a",
        boxShadow:
          "0px 4px 12px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#38bdf8",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        🛍️ E-Commerce
      </h2>

      <div
        style={{
          display: "flex",
          gap: "18px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {!token ? (
          <>
            <Link
              to="/"
              style={linkStyle}
            >
              Register 📝
            </Link>

            <Link
              to="/login"
              style={linkStyle}
            >
              Login 🔐
            </Link>

            <button
              onClick={toggleTheme}
              style={{
                background: "#facc15",
                color: "#000",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {theme === "dark"
                ? "☀️ Light"
                : "🌙 Dark"}
            </button>
          </>
        ) : (
          <>
            <Link
              to="/admin"
              style={linkStyle}
            >
              Admin 👨‍💼
            </Link>

            <Link
              to="/products"
              style={linkStyle}
            >
              Products 🛍️
            </Link>

            <Link
              to="/cart"
              style={{
                ...linkStyle,
                color: "#22c55e",
              }}
            >
              Cart 🛒 ({cart.length})
            </Link>

            <Link
              to="/wishlist"
              style={{
                ...linkStyle,
                color: "#ec4899",
              }}
            >
              Wishlist ❤️ ({wishlist.length})
            </Link>

            <Link
              to="/orders"
              style={linkStyle}
            >
              Orders 📦
            </Link>

            <div
              style={{
                background:
                  theme === "dark"
                    ? "#334155"
                    : "#cbd5e1",
                padding: "8px 14px",
                borderRadius: "20px",
                fontWeight: "bold",
                color:
                  theme === "dark"
                    ? "#38bdf8"
                    : "#0f172a",
              }}
            >
              👋 {user.name || "User"}
            </div>

            <button
              onClick={toggleTheme}
              style={{
                background: "#facc15",
                color: "#000",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {theme === "dark"
                ? "☀️ Light"
                : "🌙 Dark"}
            </button>

            <button
              onClick={logoutUser}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout 🚪
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
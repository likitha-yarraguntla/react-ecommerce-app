import { useEffect, useState } from "react";

function Wishlist({ theme }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    setWishlist(data);
  }, []);

  const moveToCart = (product, index) => {
    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const alreadyExists = cart.find(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      alert("Already In Cart 🛒");
      return;
    }

    cart.push({
      ...product,
      quantity: 1,
    });

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    const updatedWishlist = [...wishlist];

    updatedWishlist.splice(index, 1);

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    alert("Moved To Cart 🛒");
  };

  const removeWishlist = (index) => {
    const updatedWishlist = [...wishlist];

    updatedWishlist.splice(index, 1);

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    alert("Removed From Wishlist ❌");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          theme === "dark"
            ? "linear-gradient(135deg,#0f172a,#1e1b4b,#312e81)"
            : "linear-gradient(135deg,#e2e8f0,#f8fafc,#ffffff)",
        color:
          theme === "dark"
            ? "white"
            : "#0f172a",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#38bdf8",
          marginBottom: "10px",
        }}
      >
        ❤️ Wishlist
      </h1>

      <h3
        style={{
          textAlign: "center",
          color:
            theme === "dark"
              ? "#cbd5e1"
              : "#475569",
          marginBottom: "30px",
        }}
      >
        Total Wishlist Items:
        {" "}
        {wishlist.length}
      </h3>

      {wishlist.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          No Wishlist Items 😔
        </h2>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {wishlist.map(
            (product, index) => (
              <div
                key={index}
                style={{
                  width: "280px",
                  background:
                    theme === "dark"
                      ? "#1e293b"
                      : "#ffffff",
                  color:
                    theme === "dark"
                      ? "white"
                      : "#0f172a",
                  padding: "20px",
                  borderRadius: "15px",
                  boxShadow:
                    "0px 4px 15px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/250x150?text=Wishlist+Item"
                  }
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />

                <h3>{product.name}</h3>

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  ₹{product.price}
                </p>

                <p>
                  📂 {product.category}
                </p>

                <button
                  onClick={() =>
                    moveToCart(
                      product,
                      index
                    )
                  }
                  style={{
                    width: "100%",
                    background: "#22c55e",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Move To Cart 🛒
                </button>

                <button
                  onClick={() =>
                    removeWishlist(index)
                  }
                  style={{
                    width: "100%",
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Remove ❌
                </button>
              </div>
            )
          )}
        </div>
      )}

      <footer
        style={{
          textAlign: "center",
          marginTop: "50px",
          padding: "25px",
          background:
            theme === "dark"
              ? "#0f172a"
              : "#ffffff",
          color:
            theme === "dark"
              ? "#cbd5e1"
              : "#475569",
          borderRadius: "12px",
          border:
            theme === "dark"
              ? "1px solid #334155"
              : "1px solid #cbd5e1",
        }}
      >
        <h3>
          ❤️ Wishlist Store
        </h3>

        <p>
          Saved Items:
          {" "}
          {wishlist.length}
        </p>

        <p>
          Fast • Secure • Reliable Shopping
        </p>

        <p>
          © 2025 Built By Likitha ❤️
        </p>
      </footer>
    </div>
  );
}

export default Wishlist;
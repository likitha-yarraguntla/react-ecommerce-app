
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products({ theme }) {
  const [products, setProducts] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("Please Login First");
      window.location.href = "/login";
      return;
    }

    const savedProducts =
      JSON.parse(
        localStorage.getItem(
          "adminProducts"
        )
      ) || [];

    setProducts(savedProducts);

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCartIds(
      cart.map((item) => item.id)
    );
  }, []);

  const addToCart = (product) => {
    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const alreadyInCart = cart.find(
      (item) =>
        item.id === product.id
    );

    if (alreadyInCart) {
      alert(
        "Already Added To Cart 🛒"
      );
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

    setCartIds([
      ...cartIds,
      product.id,
    ]);

    alert(
      `${product.name} Added To Cart 🛒`
    );
  };

  const addToWishlist = (
    product
  ) => {
    const wishlist =
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      ) || [];

    const alreadyExists =
      wishlist.find(
        (item) =>
          item.id === product.id
      );

    if (alreadyExists) {
      alert(
        "Already In Wishlist ❤️"
      );
      return;
    }

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    alert("Added To Wishlist ❤️");
  };

  const buyNow = (product) => {
    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify(product)
    );

    navigate("/checkout");
  };

  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        product.category ===
          category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),
  ];

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
      <div
        style={{
          textAlign: "center",
          background:
            "linear-gradient(90deg,#38bdf8,#6366f1)",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
          boxShadow:
            "0px 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h1>🛍️ Mega Sale</h1>

        <h2>
          Best Deals Available 🔥
        </h2>

        <p>
          Shop Your Favourite
          Products
        </p>

        <h3>
          Total Products:
          {" "}
          {filteredProducts.length}
        </h3>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          gap: "15px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search Product 🔍"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            borderRadius: "10px",
            border:
              "1px solid #cbd5e1",
            width: "250px",
          }}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            borderRadius: "10px",
            border:
              "1px solid #cbd5e1",
          }}
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          justifyContent:
            "center",
        }}
        >
    
        {filteredProducts.length === 0 ? (
          <h2>
            No Products Found 😔
          </h2>
        ) : (
          filteredProducts.map(
            (product) => {
              const originalPrice =
                Math.floor(
                  Number(
                    product.price
                  ) /
                    (1 -
                      product.offer /
                        100)
                );

              return (
                <div
                  key={product.id}
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
                    borderRadius:
                      "15px",
                    boxShadow:
                      "0px 4px 15px rgba(0,0,0,0.2)",
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    justifyContent:
                      "space-between",
                  }}
                >
                  <div
                    style={{
                      background:
                        "#ef4444",
                      color:
                        "white",
                      padding:
                        "5px 10px",
                      borderRadius:
                        "8px",
                      display:
                        "inline-block",
                      marginBottom:
                        "10px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    SALE 🔥
                  </div>

                  <div
                    style={{
                      background:
                        theme ===
                        "dark"
                          ? "#334155"
                          : "#e2e8f0",
                      height:
                        "120px",
                      borderRadius:
                        "10px",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      fontSize:
                        "50px",
                      marginBottom:
                        "15px",
                    }}
                  >
                    📦
                  </div>

                  <h3>
                    {product.name}
                  </h3>

                  <p
                    style={{
                      color:
                        "#22c55e",
                      fontWeight:
                        "bold",
                    }}
                  >
                    🔥{" "}
                    {
                      product.offer
                    }
                    % OFF
                  </p>

                  <p
                    style={{
                      fontSize:
                        "20px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    ₹
                    {
                      product.price
                    }
                  </p>

                  <p
                    style={{
                      textDecoration:
                        "line-through",
                      color:
                        "#94a3b8",
                    }}
                  >
                    ₹
                    {
                      originalPrice
                    }
                  </p>

                  <p>
                    📂{" "}
                    {
                      product.category
                    }
                  </p>

                  <p>
                    ⭐{" "}
                    {
                      product.rating
                    }
                    /5
                  </p>

                  <button
                    onClick={() =>
                      addToCart(
                        product
                      )
                    }
                    disabled={cartIds.includes(
                      product.id
                    )}
                    style={{
                      width:
                        "100%",
                      padding:
                        "10px",
                      border:
                        "none",
                      borderRadius:
                        "8px",
                      color:
                        "white",
                      background:
                        cartIds.includes(
                          product.id
                        )
                          ? "#22c55e"
                          : "#3b82f6",
                      marginBottom:
                        "10px",
                      cursor:
                        "pointer",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {cartIds.includes(
                      product.id
                    )
                      ? "Added To Cart ✅"
                      : "Add To Cart"}
                  </button>

                  <button
                    onClick={() =>
                      addToWishlist(
                        product
                      )
                    }
                    style={{
                      width:
                        "100%",
                      padding:
                        "10px",
                      border:
                        "none",
                      borderRadius:
                        "8px",
                      color:
                        "white",
                      background:
                        "#ec4899",
                      marginBottom:
                        "10px",
                      cursor:
                        "pointer",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Wishlist ❤️
                  </button>

                  <button
                    onClick={() =>
                      buyNow(
                        product
                      )
                    }
                    style={{
                      width:
                        "100%",
                      padding:
                        "10px",
                      border:
                        "none",
                      borderRadius:
                        "8px",
                      color:
                        "white",
                      background:
                        "#f59e0b",
                      cursor:
                        "pointer",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Buy Now ⚡
                  </button>
                </div>
              );
            }
          )
        )}
      </div>
      ```jsx id="products-part3"
      <footer
        style={{
          textAlign: "center",
          marginTop: "50px",
          padding: "20px",
          color:
            theme === "dark"
              ? "#94a3b8"
              : "#475569",
          borderTop:
            theme === "dark"
              ? "1px solid #334155"
              : "1px solid #cbd5e1",
        }}
      >
        <h3
          style={{
            marginBottom: "10px",
          }}
        >
          🛍️ E-Commerce Store
        </h3>

        <p>
          Best Products • Best Deals •
          Fast Delivery 🚚
        </p>

        <p
          style={{
            marginTop: "10px",
          }}
        >
          © 2025 E-Commerce App |
          Built By Likitha ❤️
        </p>
      </footer>
    </div>
  );
}

export default Products;

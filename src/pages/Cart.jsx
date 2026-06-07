
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ theme }) {
  const [cartItems, setCartItems] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const updatedCart = cart.map(
      (item) => ({
        ...item,
        quantity:
          item.quantity || 1,
      })
    );

    setCartItems(updatedCart);
  }, []);

  const increaseQuantity = (
    index
  ) => {
    const updatedCart = [
      ...cartItems,
    ];

    updatedCart[index]
      .quantity += 1;

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const decreaseQuantity = (
    index
  ) => {
    const updatedCart = [
      ...cartItems,
    ];

    if (
      updatedCart[index]
        .quantity > 1
    ) {
      updatedCart[index]
        .quantity -= 1;

      setCartItems(updatedCart);

      localStorage.setItem(
        "cart",
        JSON.stringify(
          updatedCart
        )
      );
    }
  };

  const removeFromCart = (
    index
  ) => {
    const updatedCart = [
      ...cartItems,
    ];

    updatedCart.splice(
      index,
      1
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Item Removed 🗑️");
  };

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price) *
          Number(
            item.quantity
          ),
      0
    );

  const totalItems =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(
          item.quantity
        ),
      0
    );

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
          marginBottom:
            "10px",
        }}
      >
        🛒 Shopping Cart
      </h1>

      <h2
        style={{
          textAlign: "center",
          marginBottom:
            "30px",
        }}
      >
        Total Items:
        {" "}
        {totalItems}
      </h2>

      {cartItems.length ===
      0 ? (
        <h2
          style={{
            textAlign:
              "center",
            marginTop:
              "60px",
          }}
        >
          Cart Is Empty 😔
        </h2>
      ) : (
        <>
          <div
            style={{
              display:
                "flex",
              flexWrap:
                "wrap",
              gap: "20px",
              justifyContent:
                "center",
            }}
          >
            {cartItems.map(
              (item, index) => (
                <div
                  key={index}
                  style={{
                    width: "300px",
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
                      item.image ||
                      "https://via.placeholder.com/250"
                    }
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  />

                  <h3>{item.name}</h3>

                  <p>
                    Price: ₹{item.price}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          index
                        )
                      }
                      style={{
                        background:
                          "#ef4444",
                        color:
                          "white",
                        border:
                          "none",
                        padding:
                          "8px 12px",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold",
                      }}
                    >
                      -
                    </button>

                    <span
                      style={{
                        fontSize:
                          "18px",
                        fontWeight:
                          "bold",
                      }}
                    >
                      {
                        item.quantity
                      }
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          index
                        )
                      }
                      style={{
                        background:
                          "#22c55e",
                        color:
                          "white",
                        border:
                          "none",
                        padding:
                          "8px 12px",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <p
                    style={{
                      marginTop:
                        "15px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Subtotal: ₹
                    {Number(
                      item.price
                    ) *
                      Number(
                        item.quantity
                      )}
                  </p>

                  <button
                    onClick={() =>
                      removeFromCart(
                        index
                      )
                    }
                    style={{
                      width: "100%",
                      background:
                        "#ef4444",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "10px 15px",
                      borderRadius:
                        "8px",
                      cursor:
                        "pointer",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Remove 🗑️
                  </button>
                </div>
              )
            )}
          </div>
        
          <br />

          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            <h2
              style={{
                color: "#22c55e",
                marginBottom: "20px",
              }}
            >
              Total Price: ₹
              {totalPrice}
            </h2>

            <button
              onClick={() =>
                navigate("/checkout")
              }
              style={{
                background:
                  "#22c55e",
                color: "white",
                padding:
                  "12px 25px",
                border: "none",
                borderRadius:
                  "8px",
                fontWeight:
                  "bold",
                cursor:
                  "pointer",
                fontSize:
                  "16px",
              }}
            >
              Proceed To Checkout ⚡
            </button>
          </div>
        </>
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
          🛍️ E-Commerce Store
        </h3>

        <p>
          Fast • Secure • Reliable
          Shopping 🚚
        </p>

        <p>
          Cart Items: {totalItems}
        </p>

        <p>
          © 2025 Built By
          Likitha ❤️
        </p>
      </footer>
    </div>
  );
}
export default Cart;

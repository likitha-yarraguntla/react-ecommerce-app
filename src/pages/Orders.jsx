import { useEffect, useState } from "react";

function Orders({ theme }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setOrders(data);
  }, []);

  const updateStatus = (
    index,
    status
  ) => {
    const updatedOrders = [
      ...orders,
    ];

    updatedOrders[index].status =
      status;

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };

  const clearOrders = () => {
    if (
      window.confirm(
        "Delete All Orders?"
      )
    ) {
      localStorage.removeItem(
        "orders"
      );

      setOrders([]);
    }
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
          marginBottom: "20px",
        }}
      >
        Orders 📦
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={clearOrders}
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
          Clear All Orders 🗑️
        </button>
      </div>

      {orders.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          No Orders Found 😔
        </h2>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent:
              "center",
          }}
        >
          {orders.map(
            (item, index) => (
              <div
                key={index}
                style={{
                  width: "320px",
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
                }}
              >
                <div
                  style={{
                    fontSize: "60px",
                    textAlign:
                      "center",
                  }}
                >
                  📦
                </div>

                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{item.price}
                </p>

                <p>
                  Status:{" "}
                  <span
                    style={{
                      color:
                        item.status ===
                        "Delivered 🟢"
                          ? "#22c55e"
                          : item.status ===
                            "Shipped 🔵"
                          ? "#3b82f6"
                          : "#facc15",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {item.status ||
                      "Pending 🟡"}
                  </span>
                </p>

                {item.customerName && (
                  <>
                    <hr />

                    <p>
                      👤{" "}
                      {
                        item.customerName
                      }
                    </p>

                    <p>
                      📞{" "}
                      {item.phone}
                    </p>

                    <p>
                      📧{" "}
                      {item.email}
                    </p>

                    <p>
                      💳{" "}
                      {
                        item.paymentMethod
                      }
                    </p>

                    <p>
                      📍{" "}
                      {
                        item.address
                      }
                      <br />
                      {item.city},{" "}
                      {
                        item.state
                      }{" "}
                      -{" "}
                      {
                        item.pincode
                      }
                    </p>

                    <p>
                      🕒{" "}
                      {
                        item.orderDate
                      }
                    </p>
                  </>
                )}

                <hr />

                <div
                  style={{
                    display:
                      "flex",
                    gap: "10px",
                    marginTop:
                      "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      updateStatus(
                        index,
                        "Shipped 🔵"
                      )
                    }
                    style={{
                      background:
                        "#3b82f6",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "8px 12px",
                      borderRadius:
                        "6px",
                      cursor:
                        "pointer",
                      flex: 1,
                    }}
                  >
                    Shipped 🚚
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        index,
                        "Delivered 🟢"
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
                        "6px",
                      cursor:
                        "pointer",
                      flex: 1,
                    }}
                  >
                    Delivered ✅
                  </button>
                </div>
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
          📦 Orders Dashboard
        </h3>

        <p>
          Total Orders:{" "}
          {orders.length}
        </p>

        <p>
          Fast • Secure • Reliable
          🚚
        </p>

        <p>
          © 2025 Built By
          Likitha ❤️
        </p>
      </footer>
    </div>
  );
}

export default Orders;
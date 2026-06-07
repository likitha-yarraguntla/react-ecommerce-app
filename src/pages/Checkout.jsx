
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ theme }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const placeOrder = () => {
    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      alert("Please Fill All Fields ⚠️");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Enter Valid 10 Digit Phone Number");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert("Enter Valid Pincode");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Enter Valid Email");
      return;
    }

    const buyNowProduct = JSON.parse(
      localStorage.getItem("buyNowProduct")
    );

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    let orders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    const orderDetails = {
      customerName: name,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      paymentMethod,
      orderDate:
        new Date().toLocaleString(),
      status: "Pending 🟡",
      orderId:
        "ORD" +
        Math.floor(
          100000 +
            Math.random() * 900000
        ),
    };

    if (buyNowProduct) {
      orders.push({
        ...buyNowProduct,
        ...orderDetails,
      });

      localStorage.removeItem(
        "buyNowProduct"
      );
    } else {
      if (cart.length === 0) {
        alert("Cart is Empty 🛒");
        return;
      }

      cart.forEach((item) => {
        orders.push({
          ...item,
          ...orderDetails,
        });
      });

      localStorage.removeItem("cart");
    }

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    console.log(
      "Saved Orders:",
      JSON.parse(
        localStorage.getItem("orders")
      )
    );

    alert(
      "Order Placed Successfully 🎉"
    );

    navigate("/orders");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
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
          marginBottom: "30px",
        }}
      >
        Checkout 🛒
      </h1>

      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          background:
            theme === "dark"
              ? "#1e293b"
              : "#ffffff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0px 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) =>
            setState(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) =>
            setPincode(e.target.value)
          }
          style={inputStyle}
        />

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
          style={inputStyle}
        >
          <option value="COD">
            Cash On Delivery
          </option>
          <option value="UPI">
            UPI Payment
          </option>
          <option value="Card">
            Debit/Credit Card
          </option>
        </select>

        <button
          onClick={placeOrder}
          style={{
            width: "100%",
            background: "#22c55e",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Place Order ✅
        </button>
      </div>
    </div>
  );
}

export default Checkout;

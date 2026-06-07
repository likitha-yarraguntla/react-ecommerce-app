
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ theme }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const registerUser = () => {
    if (!name || !email || !password) {
      alert("Please Fill All Fields");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Enter Valid Email");
      return;
    }

    if (password.length < 6) {
      alert(
        "Password Must Be At Least 6 Characters"
      );
      return;
    }

    const existingUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (
      existingUser &&
      existingUser.email === email
    ) {
      alert(
        "Email Already Registered ❌"
      );
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setName("");
    setEmail("");
    setPassword("");

    alert("Registration Successful ✅");

    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          theme === "dark"
            ? "linear-gradient(135deg,#0f172a,#1e1b4b,#312e81)"
            : "linear-gradient(135deg,#e2e8f0,#f8fafc,#ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div
        style={{
          background:
            theme === "dark"
              ? "#1e293b"
              : "#ffffff",
          color:
            theme === "dark"
              ? "white"
              : "#0f172a",
          padding: "35px",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "400px",
          boxShadow:
            "0px 4px 15px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#38bdf8",
            marginBottom: "20px",
          }}
        >
          Register 📝
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border:
              "1px solid #cbd5e1",
            marginBottom: "15px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border:
              "1px solid #cbd5e1",
            marginBottom: "15px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              registerUser();
            }
          }}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border:
              "1px solid #cbd5e1",
            marginBottom: "20px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={registerUser}
          style={{
            width: "100%",
            background: "#22c55e",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register 🚀
        </button>
      </div>

      <footer
        style={{
          marginTop: "30px",
          color:
            theme === "dark"
              ? "#94a3b8"
              : "#475569",
          textAlign: "center",
        }}
      >
        © 2025 E-Commerce App |
        Built By Likitha ❤️
      </footer>
    </div>
  );
}

export default Register;

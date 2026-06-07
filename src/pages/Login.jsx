
import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

function Login({ theme }) {
  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const loginUser = () => {
    if (
      !email ||
      !password
    ) {
      alert(
        "Please Fill All Fields ⚠️"
      );
      return;
    }

    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (!savedUser) {
      alert(
        "No User Found. Please Register First."
      );
      return;
    }

    if (
      email ===
        savedUser.email &&
      password ===
        savedUser.password
    ) {
      localStorage.setItem(
        "token",
        "dummy-token"
      );

      alert(
        "Login Successful ✅"
      );

      navigate("/admin");
    } else {
      alert(
        "Invalid Email or Password ❌"
      );
    }
  };

  return (
    <div
      style={{
        minHeight:
          "100vh",

        background:
          theme ===
          "dark"
            ? "linear-gradient(135deg,#0f172a,#1e1b4b,#312e81)"
            : "linear-gradient(135deg,#e2e8f0,#f8fafc,#ffffff)",

        display:
          "flex",

        flexDirection:
          "column",

        justifyContent:
          "center",

        alignItems:
          "center",

        padding:
          "20px",
      }}
    >
      <div
        style={{
          background:
            theme ===
            "dark"
              ? "#1e293b"
              : "#ffffff",

          padding:
            "35px",

          borderRadius:
            "15px",

          width: "350px",

          color:
            theme ===
            "dark"
              ? "white"
              : "#0f172a",

          textAlign:
            "center",

          boxShadow:
            "0px 4px 15px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            color:
              "#38bdf8",

            marginBottom:
              "20px",
          }}
        >
          Login 🔐
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={{
            width:
              "100%",

            padding:
              "12px",

            borderRadius:
              "8px",

            border:
              "1px solid #cbd5e1",

            marginBottom:
              "15px",

            boxSizing:
              "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key ===
              "Enter"
            ) {
              loginUser();
            }
          }}
          style={{
            width:
              "100%",

            padding:
              "12px",

            borderRadius:
              "8px",

            border:
              "1px solid #cbd5e1",

            marginBottom:
              "15px",

            boxSizing:
              "border-box",
          }}
        />

        <div
          style={{
            textAlign:
              "right",

            marginBottom:
              "15px",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              color:
                "#38bdf8",

              textDecoration:
                "none",

              fontWeight:
                "bold",

              fontSize:
                "14px",
            }}
          >
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={
            loginUser
          }
          style={{
            width:
              "100%",

            background:
              "#38bdf8",

            color:
              "white",

            border:
              "none",

            padding:
              "12px",

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
          Login 🚀
        </button>

        <p
          style={{
            marginTop:
              "20px",
          }}
        >
          Don't have an
          account?{" "}
          <Link
            to="/"
            style={{
              color:
                "#22c55e",

              fontWeight:
                "bold",
            }}
          >
            Register
          </Link>
        </p>
      </div>

      <footer
        style={{
          marginTop:
            "30px",

          color:
            theme ===
            "dark"
              ? "#94a3b8"
              : "#475569",

          textAlign:
            "center",
        }}
      >
        © 2025 E-Commerce App
        | Built By Likitha ❤️
      </footer>
    </div>
  );
}

export default Login;

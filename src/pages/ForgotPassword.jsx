import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ theme }) {
const [email, setEmail] =
useState("");

const [newPassword,
setNewPassword] =
useState("");

const navigate =
useNavigate();

const resetPassword = () => {
if (
!email ||
!newPassword
) {
alert(
"Fill All Fields"
);
return;
}

```
const user =
  JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

if (!user) {
  alert(
    "No User Found"
  );
  return;
}

if (
  user.email !== email
) {
  alert(
    "Email Not Found"
  );
  return;
}

const updatedUser = {
  ...user,
  password:
    newPassword,
};

localStorage.setItem(
  "user",
  JSON.stringify(
    updatedUser
  )
);

alert(
  "Password Reset Successful ✅"
);

navigate("/login");
```

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
      width:
        "100%",
      maxWidth:
        "400px",

      background:
        theme ===
        "dark"
          ? "#1e293b"
          : "#ffffff",

      color:
        theme ===
        "dark"
          ? "white"
          : "#0f172a",

      padding:
        "30px",

      borderRadius:
        "15px",

      boxShadow:
        "0px 4px 15px rgba(0,0,0,0.2)",
    }}
  >
    <h1
      style={{
        textAlign:
          "center",

        color:
          "#38bdf8",

        marginBottom:
          "20px",
      }}
    >
      Forgot Password 🔑
    </h1>

    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) =>
        setEmail(
          e.target
            .value
        )
      }
      style={inputStyle}
    />

    <input
      type="password"
      placeholder="New Password"
      value={
        newPassword
      }
      onChange={(e) =>
        setNewPassword(
          e.target
            .value
        )
      }
      style={inputStyle}
    />

    <button
      onClick={
        resetPassword
      }
      style={{
        width:
          "100%",

        background:
          "#22c55e",

        color:
          "white",

        border:
          "none",

        padding:
          "12px",

        borderRadius:
          "8px",

        cursor:
          "pointer",

        fontWeight:
          "bold",
      }}
    >
      Reset Password
    </button>
  </div>
</div>


);
}

const inputStyle = {
width: "100%",
padding: "12px",
marginBottom: "15px",
borderRadius: "8px",
border: "none",
outline: "none",
boxSizing:
"border-box",
};

export default ForgotPassword;

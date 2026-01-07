import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import logo from "../../assets/logo.png"
import { FiEye, FiEyeOff } from "react-icons/fi";
import { adminLogin } from "../../Services/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

  try {
    const res = await adminLogin({
      email,
      password,
    });

    localStorage.setItem("token", res.data.data.accessToken);
    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="d-flex flex-row">
      <div className="bluePanel">
        <img src={logo} alt="God Love Logo" className="logo" />
      </div>
      <div className="formPanel">
        <form
          className="form"
          onSubmit={handleLogin}
      >
          <div className=" d-flex justify-content-center mb-5 ">
          <h2 className="fs-2 headFont" >Admin Login</h2>
          </div>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="passwordWrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="togglePassword"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* <div className="forgot">forgot password?</div> */}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

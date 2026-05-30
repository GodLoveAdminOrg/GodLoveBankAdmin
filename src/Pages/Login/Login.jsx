import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import Reveal from "../../components/common/Reveal";
import { adminLogin } from "../../Services/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await adminLogin({ email, password });
      localStorage.setItem("token", res.data.data.accessToken);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        bgcolor: "background.default",
      }}
    >
      {/* Brand panel */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #631D15 0%, #42130f 100%)",
        }}
      >
        <img src={logo} alt="God Love" style={{ width: 220, maxWidth: "60%" }} />
      </Box>

      {/* Form panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Reveal staggerChildren={false} sx={{ width: "100%", maxWidth: 420 }}>
        <Card elevation={0} sx={{ width: "100%", border: "1px solid #e7e7ea" }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ display: { md: "none" }, textAlign: "center", mb: 2 }}>
              <img src={logo} alt="God Love" style={{ height: 72 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 0.5 }}>
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 3 }}>
              Sign in to continue to your dashboard
            </Typography>

            <form onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{ py: 1.2 }}
                >
                  {loading ? "Signing in…" : "Login"}
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
        </Reveal>
      </Box>
    </Box>
  );
}

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { login, loginWithGoogle, resetPassword,getUserRoleByEmail } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
const LoginSchema = Yup.object({
  email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
  password: Yup.string().required("שדה חובה"),
});

const Login = () => {
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetOpen, setResetOpen] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

const handleSubmit = async (values: { email: string; password: string }) => {
  setError("");
  try {
    const user = await login(values.email, values.password);
    dispatch(
      setUser({
        username: user.displayName ?? user.dbUser?.name ?? "",
        isAdmin: user.dbUser?.role === "admin",
      })
    );
    navigate("/");
  } catch (e: any) {
    setError(e.message || "התחברות נכשלה");
  }
};
const handleGoogleLogin = async () => {
  setError("");
  try {
    const user = await loginWithGoogle();

    // שליפת role מהשרת (json-server)
    let role = await getUserRoleByEmail(user.email ?? "") || "customer";
    

    dispatch(
      setUser({
        username: user.displayName ?? user.email ?? "",
        isAdmin: role === "admin",
      })
    );
    navigate("/");
  } catch (e: any) {
    setError("התחברות עם גוגל נכשלה");
  }
};

  const handleResetPassword = async () => {
    setResetMsg("");
    try {
      await resetPassword(resetEmail);
      setResetMsg("קישור לאיפוס סיסמה נשלח למייל");
    } catch (e: any) {
      setResetMsg("שליחת קישור נכשלה. ודא/י שהמייל תקין");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Rubik, sans-serif",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 5,
          borderRadius: 5,
          minWidth: 360,
          maxWidth: 400,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          animation: "fadeIn 1.2s ease-in-out",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={600}
          mb={2}
          color="#c2185b"
        >
          התחברות
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange }) => (
            <Form>
              <TextField
                autoComplete="email"
                fullWidth
                label="אימייל"
                name="email"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#ec407a",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#c2185b",
                  },
                }}
              />
              <TextField
                autoComplete="current-password"
                fullWidth
                label="סיסמה"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        {showPassword ? (
                          <VisibilityOffIcon
                            onClick={togglePasswordVisibility}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <VisibilityIcon
                            onClick={togglePasswordVisibility}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#ec407a",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#c2185b",
                  },
                }}
              />
              <Stack direction="column" spacing={2} mt={2}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    py: 1.5,
                    background: "#ec407a",
                    color: "white",
                    borderRadius: 3,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    transition: "0.3s",
                    "&:hover": {
                      background: "#d81b60",
                    },
                  }}
                >
                  התחבר עכשיו
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleLogin}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#c2185b",
                    borderColor: "#ec407a",
                    "&:hover": {
                      background: "#fff0f5",
                      borderColor: "#d81b60",
                    },
                  }}
                >
                  התחברות עם גוגל
                </Button>
              </Stack>
            
              {error && (
                <>
                  <Typography mt={2} textAlign="center">
                    <a href="/register">עדיין אין לך חשבון? לחץ כאן להרשמה</a>
                  </Typography>
                  <Typography mt={1} textAlign="center">
                    <Button
                      variant="text"
                      sx={{ color: "#c2185b", fontSize: "0.95rem" }}
                      onClick={() => setResetOpen(true)}
                    >
                      ?שכחת סיסמה
                    </Button>
                  </Typography>
                </>
              )}
              
            </Form>
          )}
        </Formik>
      </Paper>

      <Dialog
        open={resetOpen}
        onClose={() => {
          setResetOpen(false);
          setResetMsg("");
        }}
      >
        <DialogTitle>איפוס סיסמה</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="אימייל"
            type="email"
            fullWidth
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          {resetMsg && (
            <Alert
              severity={resetMsg.includes("נשלח") ? "success" : "error"}
              sx={{ mt: 2 }}
            >
              {resetMsg}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetOpen(false)}>ביטול</Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            sx={{ background: "#ec407a" }}
          >
            שלח קישור לאיפוס
          </Button>
        </DialogActions>
      </Dialog>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        a {
          color: #c2185b;
          text-decoration: none;
          font-weight: 500;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </Box>
  );
};

export default Login;

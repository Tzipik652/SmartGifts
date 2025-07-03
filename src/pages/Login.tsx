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
import * as  authService from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { setCartUser } from "../redux/cartSlice";
import { setMessage } from "../redux/messageSlice";




const Login :React.FC = () => {
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetOpen, setResetOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


const LoginSchema = Yup.object({
  email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
  password: Yup.string().required("שדה חובה"),
});
  const handleSubmit = async (values: { email: string; password: string }) => {
    setError("");
    try {
      const user = await authService.login(values.email, values.password);
      dispatch(setUser(user));
       if (user.userId) {
        dispatch(setCartUser(user.userId));
      }
      dispatch(setMessage({ type: "success", text: "ההתחברות הושלמה בהצלחה" }));

      navigate("/");
    } catch (e: any) {
      dispatch(setMessage({ type: "error", text: "ההתחברות נכשלה" }));

      setError(e.message || "התחברות נכשלה");
    }
  };
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const user = await authService.loginWithGoogle();

      let role = (await authService.getUserRoleByEmail(user.email ?? "")) || "customer";

      dispatch(
        setUser({
          userId: user.uid ?? "",
          username: user.displayName ?? user.email ?? "",
          email: user.email ?? "",
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
      await authService.resetPassword(resetEmail);
      setResetMsg("קישור לאיפוס סיסמה נשלח למייל");
    } catch (e: any) {
      setResetMsg("שליחת קישור נכשלה. ודא/י שהמייל תקין");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff0f5 0%, #C0D8DD 100%)",
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
          color="#E56360"
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
                      borderColor: "#E56360",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#E56360",
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
                            onClick={() => {
                              setShowPassword(false);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <VisibilityIcon
                            onClick={() => {
                              setShowPassword(true);
                              setTimeout(() => setShowPassword(false), 1000);
                            }}
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
                      borderColor: "#E56360",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#E56360",
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
                    background: "#E56360",
                    color: "white",
                    borderRadius: 3,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    transition: "0.3s",
                    "&:hover": {
                      background: "#c94b4b",
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
                    color: "#E56360",
                    borderColor: "#E56360",
                    background: "white",
                    "&:hover": {
                      background: "#ffe4e1",
                      borderColor: "#c94b4b",
                      color: "#c94b4b",
                    },
                  }}
                >
                  התחברות עם גוגל
                </Button>
              </Stack>
               <Typography mt={2} textAlign="center">
                    <a href="/register" className="login-link">
                      עדיין אין לך חשבון? לחץ כאן להרשמה
                    </a>
                  </Typography>
              {error !== "" && (                 
                  <Typography mt={1} textAlign="center">
                    <Button
                      variant="text"
                      sx={{
                        color: "#E56360",
                        fontSize: "0.95rem",
                        "&:hover": {
                          color: "#c94b4b",
                          background: "transparent",
                        },
                      }}
                      onClick={() => setResetOpen(true)}
                    >
                      ?שכחת סיסמה
                    </Button>
                  </Typography>
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
        <DialogTitle sx={{ color: "#E56360" }}>איפוס סיסמה</DialogTitle>
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
            sx={{ background: "#E56360" }}
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
        .login-link {
          color: #E56360;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .login-link:hover {
          color: #c94b4b;
          text-decoration: underline;
        }
      `}</style>
    </Box>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import ReCAPTCHA from "react-google-recaptcha";
import { register } from "../services/authService";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/messageSlice";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(setMessage({ type: "error", text: error }));
    }
    if (success) {
      dispatch(setMessage({ type: "success", text: success }));
    }
  }, [error, success]);

const RegisterSchema = Yup.object({
  name: Yup.string().required("שדה חובה"),
  email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
  password: Yup.string()
    .min(6, "סיסמה חייבת להיות לפחות 6 תווים")
    .required("שדה חובה"),
});

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    if (!captchaToken) {
      alert("בבקשה אשרי שאת לא רובוט");
      return;
    }

    const user = await register(
      values.name,
      values.email,
      values.password,
      captchaToken
    ).then(() => {
        setSuccess("הרשמה בוצעה בהצלחה!");
        navigate("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
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
          הרשמה
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange }) => (
            <Form>
              <TextField
                autoComplete="name"
                fullWidth
                label="שם"
                name="name"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                dir="rtl"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                  sx: { pr: 1.5, textAlign: "right" },
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
                autoComplete="email"
                fullWidth
                label="אימייל"
                name="email"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                dir="rtl"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                  sx: { pr: 1.5, textAlign: "right" },
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
                autoComplete="new-password"
                fullWidth
                label="סיסמה"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                dir="rtl"
                InputProps={{
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
                  sx: { pr: 1.5, textAlign: "right" },
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
              <ReCAPTCHA
                sitekey="6LdzuWErAAAAANvBjp1WTlrNSX3ZQlNL2ixJHMwm"
                onChange={setCaptchaToken}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
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
                הרשמה
              </Button>
              <Typography mt={2} textAlign="center">
                כבר יש לך חשבון?{" "}
                <a href="/login" className="register-link">
                  התחבר כאן
                </a>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .register-link {
          color: #E56360;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .register-link:hover {
          color: #c94b4b;
          text-decoration: underline;
        }
      `}</style>
    </Box>
  );
};

export default Register;

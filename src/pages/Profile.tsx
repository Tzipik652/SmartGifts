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
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserId,
  selectUsername,
  setUser,
  selectEmail,
  selectIsAdmin,
} from "../redux/authSlice";
import { updateUser } from "../services/authService";
import { setMessage } from "../redux/messageSlice";

const Profile: React.FC = () => {
    const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);
  const userId = useSelector(selectUserId);
  const isAdmin = useSelector(selectIsAdmin);

    useEffect(() => {
      if (error) {
        dispatch(setMessage({ type: "error", text: error }));
      }
      if (success) {
        dispatch(setMessage({ type: "success", text: success }));
      }
    }, [error, success]);
  const ProfileSchema = Yup.object({
    name: Yup.string().required("שדה חובה"),
    email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
  });
  const handleSubmit = async (values: { name: string; email: string }) => {
    try {
      if (!userId) {
        setError("לא נמצא מזהה משתמש");
        setSuccess("");
        return;
      }
      await updateUser(userId, { name: values.name, email: values.email });
      dispatch(
        setUser({
          username: values.name,
          email: values.email,
          userId: userId,
          isAdmin: isAdmin,
        })
      );
      setSuccess("הפרטים עודכנו בהצלחה!");
      setError("");
    } catch (e: any) {
      setError("שגיאה בעדכון הפרטים");
      setSuccess("");
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
        width: "100%",
        height: "100%",
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
          הפרופיל שלי
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{
            name: username || "",
            email: email || "",
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <TextField
                autoComplete="name"
                fullWidth
                label="שם"
                name="name"
                variant="outlined"
                margin="normal"
                value={values.name}
                onChange={handleChange}
                error={touched.name && !!errors.name}
                helperText={
                  touched.name && typeof errors.name === "string"
                    ? errors.name
                    : undefined
                }
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
                value={values.email}
                onChange={handleChange}
                error={touched.email && !!errors.email}
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
                עדכון פרטים
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Profile;

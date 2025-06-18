import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productService";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { categoryOptions } from "../constants/categoryOptions";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/messageSlice";

const ProductSchema = Yup.object({
  name: Yup.string().required("שם מוצר הוא שדה חובה"),
  description: Yup.string().required("תיאור הוא שדה חובה"),
  category: Yup.string().required("בחירת קטגוריה היא שדה חובה"),
  price: Yup.number()
    .typeError("מחיר חייב להיות מספר")
    .min(1, "מחיר חייב להיות גדול מ-0")
    .required("מחיר הוא שדה חובה"),
  imageUrl: Yup.string().url("כתובת תמונה לא תקינה").required("שדה חובה"),
});

const AddProduct = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
  
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setError("");
    setSuccess("");
    try {
      await addProduct(values);
      setSuccess("המוצר נוסף בהצלחה!");
      dispatch(setMessage({ type: "success", text: "המוצר נוסף בהצלחה!" }));
      resetForm();
      setTimeout(() => navigate("/products"), 1200);
    } catch (e: any) {
      dispatch(setMessage({ type: "error", text: "שגיאה בהוספת מוצר" }));
      setError("שגיאה בהוספת מוצר");
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
          color="#E56360"
        >
          הוספת מוצר חדש
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Formik
          initialValues={{
            name: "",
            description: "",
            category: "",
            price: "",
            imageUrl: "",
          }}
          validationSchema={ProductSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <TextField
                fullWidth
                label="שם מוצר"
                name="name"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                value={values.name}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                dir="rtl"
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
                fullWidth
                label="תיאור"
                name="description"
                variant="outlined"
                margin="normal"
                multiline
                minRows={2}
                onChange={handleChange}
                value={values.description}
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                dir="rtl"
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
              <FormControl
                fullWidth
                size="small"
                error={touched.category && !!errors.category}
                sx={{
                  mt: 2,
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#E56360",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#E56360",
                  },
                }}
              >
                <InputLabel>קטגוריה</InputLabel>
                <Field
                  as={Select}
                  name="category"
                  label="קטגוריה"
                  error={touched.category && !!errors.category}
                >
                  {categoryOptions.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

              <TextField
                fullWidth
                label="מחיר (₪)"
                name="price"
                variant="outlined"
                margin="normal"
                type="number"
                onChange={handleChange}
                value={values.price}
                error={touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                dir="rtl"
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
                fullWidth
                label="קישור לתמונה"
                name="imageUrl"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                value={values.imageUrl}
                error={touched.imageUrl && !!errors.imageUrl}
                helperText={touched.imageUrl && errors.imageUrl}
                dir="rtl"
                InputProps={{
                  startAdornment: (
                    <AddPhotoAlternateIcon sx={{ mr: 1, color: "#E56360" }} />
                  ),
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
                  הוסף מוצר
                </Button>
              </Stack>
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

export default AddProduct;

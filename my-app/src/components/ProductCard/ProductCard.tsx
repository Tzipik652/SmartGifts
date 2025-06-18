import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../../models/product";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { selectIsAdmin, selectUserId } from "../../redux/authSlice";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector(selectIsAdmin);
  const userId = useSelector(selectUserId);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({userId,product}));
  };

  const handleDelete = () => {
      onDelete?.(product.id);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        borderRadius: 3,
        boxShadow: 4,
        overflow: "hidden",
      }}
    >
      {isAdmin && (
        <IconButton
          onClick={handleDelete}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "#fbeaea",
            color: "#E56360",
            ":hover": {
              backgroundColor: "#f1d1d1",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}

      <CardMedia
        component="img"
        height="160"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, minHeight: 40 }}
        >
          {product.description}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          ₪{product.price}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleProductClick}
            sx={{
              backgroundColor: "#E56360",
              ":hover": { backgroundColor: "#d04f4c" },
            }}
          >
            פרטים 🎉
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              backgroundColor: "#E56360",
              ":hover": { backgroundColor: "#d04f4c" },
            }}
          >
            לעגלה 🛒
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartProduct } from "../../models/product";

interface CartItemProps {
  item: CartProduct;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <Card sx={{ display: "flex", mb: 2, alignItems: "center", p: 1 }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 1 }}
        image={item.imageUrl}
        alt={item.name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2">מחיר ליחידה: ₪{item.price}</Typography>
        <Typography variant="body2">סה"כ: ₪{item.price * item.quantity}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <IconButton
            onClick={onDecrease}
            disabled={item.quantity <= 1}
            color="primary"
          >
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
          <IconButton onClick={onIncrease} color="primary">
            <AddIcon />
          </IconButton>

          <IconButton
            onClick={onRemove}
            color="error"
            sx={{ ml: "auto" }}
            aria-label="remove"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;

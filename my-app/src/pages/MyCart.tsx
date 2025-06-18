import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  selectCartItems,
  selectCartItemCount,
  selectCartTotalPrice,
} from "../redux/cartSlice";
import { CartProduct } from "../models/product";
import CartItem from "../components/CartItem/CartItem";

import {
  Container,
  Typography,
  Divider,
  Box,
  Paper,
} from "@mui/material";

const MyCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItemsCount = useSelector(selectCartItemCount);
  const cartTotalPrice = useSelector(selectCartTotalPrice);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 80,
          left: 20,
          zIndex: 1000,
          bgcolor: "white",
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 4,
          p: 2,
          minWidth: 180,
        }}
      >

        <Typography>סה"כ פריטים: {cartItemsCount}</Typography>
        <Typography>סה"כ מחיר: ₪{cartTotalPrice.toFixed(2)}</Typography>
      </Box>

      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            🛒 העגלה שלי
          </Typography>

          {cartItems.length === 0 ? (
            <Typography variant="body1" textAlign="center">
              העגלה ריקה
            </Typography>
          ) : (
            <Box>
              {cartItems.map((item: CartProduct) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => dispatch(increaseQuantity(item.id))}
                  onDecrease={() => dispatch(decreaseQuantity(item.id))}
                  onRemove={() => dispatch(removeFromCart(item.id))}
                />
              ))}

              <Divider sx={{ my: 3 }} />
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default MyCart;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Product } from "../models/product";
import { selectIsAdmin, selectUserId } from "../redux/authSlice";
import { getProductById } from "../services/productService";
import { addOpinion, deleteOpinion, getgetOpinionsByProductId } from "../services/opinionsService";

const labels: { [index: number]: string } = {
  1: "גרוע",
  2: "לא טוב",
  3: "בסדר",
  4: "טוב",
  5: "מעולה",
};

function getLabelText(value: number) {
  return `${value} כוכבים, ${labels[value]}`;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    category: "",
    price: 0,
    imageUrl: "",
  });
  const [opinions, setOpinions] = useState<any[]>([]);
  const [openOpinion, setOpenOpinion] = useState(false);
  const [newOpinion, setNewOpinion] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [hover, setHover] = useState<number>(-1);

  const isAdmin = useSelector(selectIsAdmin);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    getProductById(id|| "")
      .then(setProduct);
  }, [id]);

  useEffect(() => {
    getgetOpinionsByProductId(id || "")
      .then(setOpinions);
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({userId,product}));
  };

  const handleDeleteOpinion = (opinionId: string) => {
    deleteOpinion(opinionId)
    .then(() =>
      setOpinions((prev) => prev.filter((op) => op.id !== opinionId))
    );
  };

  const handleAddOpinion = () => {
    const newOpinionData = {
      productId: id,
      userId: userId,
      comment: newOpinion,
      rating: rating,
    };
    addOpinion(newOpinionData)  
      .then((op) => setOpinions((prev) => [...prev, op]));

    setOpenOpinion(false);
    setNewOpinion("");
    setRating(5);
  };

  if (!product) return <div>טוען...</div>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={product.imageUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            מחיר: ₪{product.price}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddToCart}
          >
            הוסף לעגלה 🛒
          </Button>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">חוות דעת גולשים</Typography>
        {opinions.length === 0 && <Typography>אין עדיין חוות דעת.</Typography>}
        {opinions.map((op) => (
          <Box
            key={op.id}
            sx={{
              border: "1px solid #eee",
              borderRadius: 2,
              p: 2,
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Rating name="read-only" value={op.rating} readOnly />
              <Typography>{op.comment}</Typography>
            </Box>
            {userId && op.userId === userId && (
              <IconButton
                onClick={() => handleDeleteOpinion(op.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}

        {!isAdmin && (
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            onClick={() => setOpenOpinion(true)}
          >
            הוסף חוות דעת ✍️
          </Button>
        )}
      </Box>

      <Dialog open={openOpinion} onClose={() => setOpenOpinion(false)}>
        <DialogTitle>הוסף חוות דעת</DialogTitle>
        <DialogContent>
          <TextField
            label="חוות דעת"
            fullWidth
            multiline
            minRows={2}
            value={newOpinion}
            onChange={(e) => setNewOpinion(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Rating
            name="hover-feedback"
            value={rating}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setRating(newValue || 1);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {rating !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOpinion(false)}>ביטול</Button>
          <Button
            onClick={handleAddOpinion}
            variant="contained"
            disabled={!newOpinion}
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetails;

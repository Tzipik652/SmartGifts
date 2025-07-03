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
import {
  addOpinion,
  deleteOpinion,
  getgetOpinionsByProductId,
} from "../services/opinionsService";
import axios from "axios";
import { setMessage } from "../redux/messageSlice";

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

const ProductDetails: React.FC = () => {
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
  const [loading, setLoading] = useState(true);

  const isAdmin = useSelector(selectIsAdmin);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const fetchOpinionsWithUsernames = async () => {
    try {
      const opinionsFromServer = await getgetOpinionsByProductId(id!);
      const usersResponse = await axios.get("http://localhost:3001/users");
      const users = usersResponse.data;

      const enriched = opinionsFromServer.map((opinion: any) => {
        const user = users.find((u: any) => u.id === opinion.userId);
        return {
          ...opinion,
          username: user?.name || "משתמש",
        };
      });

      setOpinions(enriched);
    } catch (error) {
      dispatch(setMessage({ type: "error", text: "שגיאה בטעינת חוות הדעת"})); 
      console.error("שגיאה בטעינת חוות הדעת:", error);
    }
  };

  // טען מוצר
  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductById(id)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          dispatch(setMessage({ type: "error", text: "שגיאה בטעינת המוצר"}));  
          console.error("שגיאה בטעינת המוצר:", err);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchOpinionsWithUsernames();
    }
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ userId, product }));
  };

  const handleDeleteOpinion = async (opinionId: string) => {
    try {
      await deleteOpinion(opinionId);
      setOpinions((prev) => prev.filter((op) => op.id !== opinionId));
    } catch (error) {
      dispatch(setMessage({ type: "error", text: "שגיאה במחיקת חוות הדעת"}));      
      console.error("שגיאה במחיקת חוות הדעת:", error);
    }
  };

  const handleAddOpinion = async () => {
    try {
      const newOpinionData = {
        productId: id,
        userId,
        comment: newOpinion,
        rating,
      };

      await addOpinion(newOpinionData);
      dispatch(setMessage({ type: "info", text: "חוות הדעת נשמרה במערכת, בכל שלב תוכל למחוק או לערוך אותה"}));  

      await fetchOpinionsWithUsernames(); 

      setOpenOpinion(false);
      setNewOpinion("");
      setRating(5);
      setHover(-1);
    } catch (error) {
      dispatch(setMessage({ type: "error", text: "שגיאה בהוספת חוות הדעת"}));  
      console.error("שגיאה בהוספת חוות הדעת:", error);
      alert("❌ שגיאה בשמירת חוות הדעת.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, textAlign: "center" }}>
        <Typography variant="h6">טוען...</Typography>
      </Box>
    );
  }

  if (!product.id) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, textAlign: "center" }}>
        <Typography variant="h6">מוצר לא נמצא</Typography>
      </Box>
    );
  }

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
              <Typography variant="caption" color="textSecondary">
                משתמש: {op.username}
              </Typography>
            </Box>
            {op.userId === userId && (
              <IconButton
                onClick={() => handleDeleteOpinion(op.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}

        {!isAdmin && userId && (
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
            sx={{ mb: 2, mt: 1 }}
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
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {rating !== null && (
            <Box sx={{ ml: 2 }}>
              {labels[hover !== -1 ? hover : rating]}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOpinion(false)}>ביטול</Button>
          <Button
            onClick={handleAddOpinion}
            variant="contained"
            disabled={!newOpinion.trim()}
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetails;

import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { Product } from "../models/product";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
// FIX: Import Material-UI components
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { selectIsAdmin } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { categoryOptions } from "../constants/categoryOptions";
import { deleteProduct, getProductsByFilters } from "../services/productService";

const PAGE_SIZE = 20;

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isAdmin = useSelector(selectIsAdmin);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setProducts([]);
  }, [search, price, category]);

  useEffect(() => {
    setLoading(true);

    const params = [
      search ? `name_like=${encodeURIComponent(search)}` : "",
      price ? `price_lte=${encodeURIComponent(price)}` : "",
      category ? `category=${encodeURIComponent(category)}` : "",
      `_page=${page}`,
      `_limit=${PAGE_SIZE}`,
    ]
      .filter(Boolean)
      .join("&");

    getProductsByFilters(params)
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
        setHasMore(false);
      })
      .then((data) => {
        setProducts((prev) => (page === 1 ? data : [...prev, ...data]));
        setHasMore(data.length === PAGE_SIZE);
        setLoading(false);
      });
  }, [search, price, category, page]);

  const handelDeleteProduct = (id: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את המוצר? פעולה זו לא ניתנת לביטול.")) {

      deleteProduct(id)
    .then(() => {
        console.log("Product deleted successfully");
      setProducts((prev) => prev.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error)
    });
    }
  }


  const productsList = React.useMemo(
    () =>
      products.map((product, idx) => {
        return (
          <div
            key={product.id}
            style={{ marginBottom: 12}}
          >
            <ProductCard
             product={product}
             onDelete={handelDeleteProduct}
            />
         
          </div>
        );
      }),
    [products, isAdmin]
  );

  return (
    <div>
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          background: "#fff",
          padding: 16,
          top: "14vh",
          width: "100%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          display: "flex",
          gap: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="חפש לפי שם"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          style={{ minWidth: 180 }}
        />

        <FormControl variant="outlined" size="small" style={{ minWidth: 160 }}>
          <InputLabel>קטגוריה</InputLabel>
          <Select
            label="קטגוריה"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ minWidth: 220 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            טווח מחירים
          </Typography>
          <Slider
            value={price ? [0, Number(price)] : [0, 500]}
            min={0}
            max={500}
            step={10}
            valueLabelDisplay="auto"
            onChange={(_, newValue) => {
              if (Array.isArray(newValue)) {
                setPrice(newValue[1].toString());
              }
            }}
            sx={{ width: 180 }}
          />
        </Box>
      </div>
      <InfiniteScroll
        dataLength={products.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<div>טוען...</div>}
        endMessage={<div>אין עוד מוצרים</div>}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
          alignItems: "stretch",
          marginTop: "20vh",
        }}
      >
        {productsList}
      </InfiniteScroll>
    </div>
  );
};

export default ProductsList;

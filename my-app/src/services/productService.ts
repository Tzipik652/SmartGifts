// src/services/productService.ts
import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get("http://localhost:3001/products");
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`http://localhost:3001/products/${id}`);
  return response.data;
};

export const addProduct = async (product: any) => {
  return axios.post("http://localhost:3001/products", product);
};

export const getProductsByFilters = async (params: any) => {
  const response = await axios.get(`http://localhost:3001/products?${params}`);
  return response.data;
};
export const deleteProduct = async (id: string) => {
  return axios.delete(`http://localhost:3001/products/${id}`);
};

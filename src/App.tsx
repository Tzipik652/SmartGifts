// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import MyCart from './pages/MyCart';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProductsList from './pages/ProductsList';
import GlobalMessage from './components/GlobalMessage/GlobalMessage';
import { Box, CircularProgress } from '@mui/material';

const AddProduct = lazy(() => import('./pages/AddProduct'));

const App:React.FC = () => {
  
  return (
    <>
      <GlobalMessage />
      <Suspense
            fallback={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                }}
              >
                <CircularProgress color="secondary" />
              </Box>
            }
          >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}>
          <Route path="/products" element={<PrivateRoute><ProductsList  /></PrivateRoute>} />
          <Route path="/product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><MyCart /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} /> 	
        </Route>
      </Routes>
      </Suspense>
      </>
  );
};

export default App;

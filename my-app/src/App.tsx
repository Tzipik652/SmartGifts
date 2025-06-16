// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import MyCart from './pages/MyCart';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProduct';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProductsList from './pages/ProductsList';

const App = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}>
          <Route path="/products" element={<PrivateRoute><ProductsList /></PrivateRoute>} />
          <Route path="/product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><MyCart /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} /> 	{/* הוספת מוצר(מנהל) הוסיפי LAZY LOADDING */}
        </Route>
      </Routes>
  );
};

export default App;

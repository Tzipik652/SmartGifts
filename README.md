# 🎁 SmartGifts – React Final Project 2025

Welcome to **SmartGifts**, an e-commerce platform for discovering and purchasing curated gifts by category. This project was built as a final assignment for the 2025 React course and demonstrates advanced usage of modern React tools and patterns.

---

## 📌 Project Overview

SmartGifts allows users to:
- Browse gifts by categories
- View customer reviews for each product
- Register and log in securely
- Add products to a shopping cart
- Write or delete reviews for products
- Manage personal details
- (Admin only) Add and delete products

All backend interactions are handled via a mock JSON server, inspired by [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

---

## 🚀 Technologies Used

- **React + TypeScript**
- **React Router DOM** – Routing and navigation
- **Formik + Yup** – Form handling and validation
- **Redux Toolkit** – Global state management
- **Axios** – API communication
- **SCSS / MUI / Bootstrap** – Responsive design
- **Custom Hooks** – Reusable logic for API calls
- **JSON Server** – Simulated backend
- **React Toasts** – UI feedback for actions

---

## 🛠 Installation & Setup

```bash
# Create a TypeScript React app
npx create-react-app smart-gifts --template typescript

# Install core dependencies
npm install formik yup axios react-router-dom
npm install @reduxjs/toolkit react-redux
npm install sass generate-react-cli

# (Optional) Install json-server globally for local backend simulation
npm install -g json-server

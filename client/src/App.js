import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/Routes/Private";
import Dashboard from "./user/Dashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddCategory from "./pages/Admin/AddCategory";
import AddProduct from "./pages/Admin/AddProduct";
import Users from "./pages/Admin/Users";
import Orders from "./user/Orders";
import Profile from "./user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import React, { lazy, Suspense } from "react";

const Shop = lazy(() => import("./pages/Shop"));
const Login = lazy(() => import("./pages/Auth/Login"));
const HomePage = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Policy = lazy(() => import("./pages/Policy"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ForgottenPassword = lazy(() => import("./pages/Auth/ForgottenPassword"));

function App() {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/add-category" element={<AddCategory />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/add-product" element={<AddProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/view-users" element={<Users />} />
          </Route>

          <Route path="/forgot-password" element={<ForgottenPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

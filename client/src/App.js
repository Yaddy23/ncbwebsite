import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";

const Dashboard = lazy(() => import("./user/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const AddCategory = lazy(() => import("./pages/Admin/AddCategory"));
const AddProduct = lazy(() => import("./pages/Admin/AddProduct"));
const Users = lazy(() => import("./pages/Admin/Users"));
const Orders = lazy(() => import("./user/Orders"));
const Profile = lazy(() => import("./user/Profile"));
const Products = lazy(() => import("./pages/Admin/Products"));
const UpdateProduct = lazy(() => import("./pages/Admin/UpdateProduct"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CategoryProduct = lazy(() => import("./pages/CategoryProduct"));
const Categories = lazy(() => import("./pages/Categories"));
const Shop = lazy(() => import("./pages/Shop"));
const Login = lazy(() => import("./pages/Auth/Login"));
const HomePage = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Policy = lazy(() => import("./pages/Policy"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ForgottenPassword = lazy(() => import("./pages/Auth/ForgottenPassword"));
const Search = lazy(() => import("./pages/Search"));
const AdminOrders = lazy(() => import("./pages/Admin/AdminOrders"));
function App() {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/search" element={<Search />} />
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
            <Route path="admin/orders" element={<AdminOrders />}></Route>
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

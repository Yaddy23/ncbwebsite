import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Dashboard from './user/Dashboard';
import Login from './pages/Auth/Login';
import PrivateRoute from './components/Routes/Private';
import ForgottenPassword from './pages/Auth/ForgottenPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddCategory from './pages/Admin/AddCategory';
import AddProduct from './pages/Admin/AddProduct';
import Users from './pages/Admin/Users';
import Orders from './user/Orders';
import Profile from './user/Profile';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<PrivateRoute />}> 
        <Route path="user" element={<Dashboard/>} />
        <Route path="user/orders" element={<Orders/>} />
        <Route path="user/profile" element={<Profile/>} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />} >
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/add-category" element={<AddCategory />} />
        <Route path="admin/add-product" element={<AddProduct />} />
        <Route path="admin/view-users" element={<Users />} />
      </Route>
      <Route path='/forgot-password' element={<ForgottenPassword />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/policy' element={<Policy />} />
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
    </>
  );
}

export default App;

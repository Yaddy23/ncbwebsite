import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from './../../components/Layout';
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("/api/v1/auth/login", {
            email,
            password,
            
          });
          if (res && res.data.success) {
            toast.success(res.data && res.data.message, {duration: 3000});
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            })
            localStorage.setItem('auth', JSON.stringify(res.data))
            navigate(location.state || "/");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
        };

    return(
        <Layout title="Login">
            <div className="wrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-box">
            <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address" 
            required />
            </div>
            <div className="input-box">
            <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter Password" 
            required />
            </div>
            
            <div className="input-box button">
            <input type="button" defaultValue="Forgot Password" onClick={() => {navigate('/forgot-password')}} />
            </div>
            <div className="input-box button">
            <input type="Submit" defaultValue="Sign In" />
            </div>

        </form>
        </div>
        </Layout>
    )  
}

export default Login;
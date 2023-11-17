import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from './../../components/Layout';

const Register = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

  // form function
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {duration: 3000});
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    };

  return (
    <Layout title="Register">
        <div className="wrapper">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-box">
            <input 
            type="text" 
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            placeholder="Enter First Name" 
            required />
            </div>
            <div className="input-box">
            <input 
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            placeholder="Enter Last Name" 
            required />
            </div>
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
            placeholder="Create Password" 
            required />
            </div>
            <div className="input-box">
            <input 
            type="text" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone Number" 
            required />
            </div>
            <div className="input-box">
            <input 
            type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address" 
            required />
            </div>
            <div className="input-box">
            <input 
            type="text" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="What is Your Favorite Sport" 
            required />
            </div>
            <div className="input-box button">
            <input type="Submit" defaultValue="Register Now" />
            </div>
        </form>
        </div>
    </Layout>
  );
};

export default Register;
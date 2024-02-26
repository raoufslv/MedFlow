import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Signin.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import ForgetPassword from "../pages/ForgetPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/dashboard" element={<Home />}></Route>
      <Route path="/historique" element={<Home />}></Route>
      <Route path="/addpatient" element={<Home />}></Route>
      <Route path="/patient/:id" element={<Home />}></Route>
      <Route path="/profile" element={<Home />}></Route>
      <Route path="/password" element={<Home />}></Route>
      <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default Routers;

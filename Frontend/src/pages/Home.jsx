import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Home/Dashboard/Dashboard.jsx";
import Profile from "../components/Home/Profile/Profile.jsx";
import Historique from "../components/Home/History/Historique.jsx";
import AddPatient from "../components/Home/Dashboard/AddPatient.jsx";
import Patient from "../components/Home/Dashboard/Patient.jsx";
import SideBar from "../components/Home/UI/SideBar.jsx";
import NavbarUser from "../components/Home/UI/NavbarUser.jsx";
import Password from "../components/Home/Profile/Password.jsx";
import axios from "../config/axiosConfig.js";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let pageActive = window.location.pathname;

  // Redirect if the user is not logged in
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      // check if the token is still valid
      axios
        .get("users/verifyToken", {
          headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          localStorage.removeItem("token");
          window.location.href = "/signin";
        });
    }
  }, [token, navigate]);

  const getComponent = () => {
    pageActive = pageActive.split("/")[1];
    console.log(pageActive);
    switch (pageActive) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <Profile />;
      case "password":
        return <Password />;
      case "historique":
        return <Historique />;
      case "addpatient":
        return <AddPatient />;
      case "patient":
        return <Patient />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className=" h-screen w-screen flex ">
      <SideBar />

      <div className=" flex flex-col w-4/5">
        <NavbarUser />
        {getComponent()}
      </div>
    </div>
  );
};

export default Home;

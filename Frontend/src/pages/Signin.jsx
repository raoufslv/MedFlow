import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../config/axiosConfig.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const formik = useFormik({
    initialValues: {
      Username: "",
      password: "",
    },
    validationSchema: Yup.object({
      Username: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("users/signin", values)
        .then((response) => {
          console.log(response.data); // Handle successful response here
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("Nom", response.data.Nom);
          localStorage.setItem("Prenom", response.data.Prenom);
          localStorage.setItem("Username", response.data.Username);
          localStorage.setItem("mail", response.data.mail);
          localStorage.setItem("PhoneNumber", response.data.PhoneNumber);
          localStorage.setItem("Specialite", response.data.Speciality);
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          console.log(error.response);
          toast.error(error.response.data.message);
        });
    },
  });

  // check if user is already logged in
  if (localStorage.getItem("token")) {
    // check if the token is still valid
    axios
      .get("users/verifyToken", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.log(error.response);
        localStorage.removeItem("token");
      });
  }

  return (
    <div className=" h-screen w-screen flex relative">
      <ToastContainer />
      <div
        className="flex items-center gap-5 p-4 absolute cursor-pointer"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img src="icowhite.svg" className="w-1/3" alt="" />
        <h1 className="text-3xl text-white font-racingSansOne">Med Flow</h1>
      </div>
      <div className="w-full bg-secondary flex justify-center items-center rounded-tr-3xl">
        <img
          src="images/doctorCheking.png"
          alt="img_illustartion_desk_pc"
          className="w-7/12"
        />
      </div>
      <div className=" flex flex-col items-center justify-center w-11/12">
        <div className=" rounded-xl w-[27rem]">
          <h2 className="text-3xl font-semibold mb-5 text-center">
            Bienvenu à
          </h2>
          <h2 className="text-3xl mb-5 text-center font-racingSansOne text-secondary">
            MedFlow
          </h2>
          <h2 className="text-3xl font-semibold mb-5 text-center">
            Connectez-vous
          </h2>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="Username">Addresse mail</label>
              <div className=" relative mt-2">
                <input
                  type="text"
                  id="Username"
                  name="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Username}
                  className={`border rounded-md p-5 h-9 w-full ${
                    formik.touched.Username &&
                    formik.errors.Username &&
                    "border-red-500"
                  }
                    `}
                  placeholder="Entrez votre email ou userName"
                />
              </div>
              {formik.touched.Username && formik.errors.Username && (
                <div className="text-red-500">{formik.errors.Username}</div>
              )}
            </div>

            <div>
              <label htmlFor="password">Mot de passe </label>
              <div className=" relative mt-2">
                <img
                  src="icons/passwordEye.svg"
                  alt="icon_eye"
                  className=" rounded object-center absolute p-1 right-1 top-1 h-8 w-8"
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`border rounded-md p-5 h-9 w-full ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "border-red-500"
                  }`}
                  placeholder="Entrer votre mot de passe"
                />
                <a
                  href="/forgetpassword"
                  className=" text-black text-xs  font-semibold absolute right-0 bottom-[-1.3rem] hover:text-secondary"
                >
                  Mot de passe oublié ?
                </a>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-secondary text-white font-bold mt-5 p-3 rounded-md hover:bg-secondary/80 transition duration-300 ease-in-out"
            >
              Se connecter
            </button>
          </form>
          <div>
            <div className="flex justify-center mt-3">
              <p className="text-xm">
                Vous n'avez pas de compte ?
                <span
                  onClick={() => {
                    window.location.href = "/signup";
                  }}
                  className=" ml-3 font-semibold underline text-black transition duration-300 ease-in-out w-full  cursor-pointer hover:text-secondary"
                >
                  Inscrivez-vous
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

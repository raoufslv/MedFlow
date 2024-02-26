import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosConfig.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    Nom: Yup.string().required("Nom est requis"),
    Prenom: Yup.string().required("Prenom est requis"),
    mail: Yup.string().email("Email invalide").required("Email est requis"),
    PhoneNumber: Yup.number("Numéro de téléphone invalide").required(
      "Numéro de téléphone est requis"
    ),
    Username: Yup.string().required("Nom utilisateur est requis"),
    Specialite: Yup.string().required("Specialité est requise"),
    password: Yup.string()
      .min(6, "Mot de passe doit contenir au moins 6 caractères")
      .required("Mot de passe est requis"),
  });

  const formik = useFormik({
    initialValues: {
      Nom: "",
      Prenom: "",
      mail: "",
      PhoneNumber: "",
      Username: "",
      Specialite: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("/users/signup", values)
        .then((response) => {
          console.log(response.data); // Handle successful response here
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("Nom", response.data.Nom);
          localStorage.setItem("Prenom", response.data.Prenom);
          localStorage.setItem("Username", response.data.Username);
          localStorage.setItem("mail", response.data.mail);
          localStorage.setItem("PhoneNumber", response.data.PhoneNumber);
          localStorage.setItem("Specialite", response.data.Speciality);
          navigate("/dashboard", { replace: true });
        })
        .catch((error) => {
          console.log(error.response.data);
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
          src="images/doctorShakingHand.png"
          alt="img_illustartion_desk_pc"
          className="w-7/12"
        />
      </div>
      <div className=" flex flex-col items-center justify-center w-11/12">
        <div className=" rounded-xl w-[32rem]">
          <h2 className="text-3xl font-semibold mb-5 text-center">
            Bienvenu à
          </h2>
          <h2 className="text-3xl mb-5 text-center font-racingSansOne text-secondary">
            MedFlow
          </h2>
          <h2 className="text-3xl font-semibold mb-5 text-center">
            Creer un compte
          </h2>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-10">
              <div>
                <label
                  htmlFor="Nom"
                  className={`text-sm ${
                    formik.touched.Nom && formik.errors.Nom
                      ? "text-red-500"
                      : ""
                  }
                `}
                >
                  {formik.touched.Nom && formik.errors.Nom
                    ? formik.errors.Nom
                    : "Nom"}
                </label>
                <input
                  type="text"
                  className={`mt-2 border border-gray-400 rounded-md p-5 h-9 w-full
                  ${formik.touched.Nom && formik.errors.Nom && "border-red-500"}
                  `}
                  name="Nom"
                  id="Nom"
                  placeholder="Entrez votre nom"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Nom}
                />
              </div>
              <div>
                <label
                  htmlFor="Prenom"
                  className={`text-sm ${
                    formik.touched.Prenom && formik.errors.Prenom
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {formik.touched.Prenom && formik.errors.Prenom
                    ? formik.errors.Prenom
                    : "Prenom"}
                </label>
                <input
                  type="text"
                  className={`mt-2 border border-gray-400 rounded-md p-5 h-9 w-full
                  ${
                    formik.touched.Prenom &&
                    formik.errors.Prenom &&
                    "border-red-500"
                  }
                  `}
                  name="Prenom"
                  id="Prenom"
                  placeholder="Entrez votre prenom"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Prenom}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="mail"
                className={`text-sm ${
                  formik.touched.mail && formik.errors.mail
                    ? "text-red-500"
                    : ""
                }`}
              >
                {formik.touched.mail && formik.errors.mail
                  ? formik.errors.mail
                  : "Addresse mail"}
              </label>
              <input
                type="email"
                name="mail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Entrez votre email"
                value={formik.values.mail}
                className={`mt-2 border border-gray-400 rounded-md p-5 h-9 w-full ${
                  formik.touched.mail &&
                  formik.errors.mail &&
                  "border-red-500"
                }`}
              />
            </div>
            <div className="flex gap-10">
              <div>
                <label
                  htmlFor="PhoneNumber"
                  className={`text-sm
                ${
                  formik.touched.PhoneNumber &&
                  formik.errors.PhoneNumber &&
                  `text-red-500`
                }`}
                >
                  {formik.touched.PhoneNumber && formik.errors.PhoneNumber
                    ? formik.errors.PhoneNumber
                    : "Numéro de téléphone"}
                </label>
                <input
                  type="text"
                  className={`mt-2 border border-gray-400 rounded-md p-5 h-9 w-full
                  ${
                    formik.touched.PhoneNumber &&
                    formik.errors.PhoneNumber &&
                    "border-red-500"
                  }
                  `}
                  name="PhoneNumber"
                  id="PhoneNumber"
                  placeholder="Entrez votre numéro de téléphone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.PhoneNumber}
                />
              </div>
              <div>
                <label
                  htmlFor="Specialite"
                  className={`text-sm ${
                    formik.touched.Specialite && formik.errors.Specialite
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {formik.touched.Specialite && formik.errors.Specialite
                    ? formik.errors.Specialite
                    : "Specialité"}
                </label>
                <input
                  type="text"
                  className={`mt-2 border border-gray-400 rounded-md p-5 h-9 w-100 
                  ${
                    formik.touched.Specialite &&
                    formik.errors.Specialite &&
                    "border-red-500"
                  }
                  `}
                  name="Specialite"
                  id="Specialite"
                  placeholder="Entrez votre specialité"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Specialite}
                />
              </div>
            </div>

            <div className="flex gap-10">
              <div>
                <label
                  htmlFor="Username"
                  className={`text-sm ${
                    formik.touched.Username && formik.errors.Username
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {formik.touched.Username && formik.errors.Username
                    ? formik.errors.Username
                    : "Nom utilisateur"}
                </label>

                <input
                  type="Username"
                  id="Username"
                  name="Username"
                  onChange={formik.handleChange}
                  placeholder="Entrez votre nom d'utilisateur"
                  onBlur={formik.handleBlur}
                  value={formik.values.Username}
                  className={`mt-2 border border-gray-400 rounded-md p-5 h-9 w-full
                  ${
                    formik.touched.Username &&
                    formik.errors.Username &&
                    "border-red-500"
                  }
                  `}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`text-sm
                ${
                  formik.touched.password && formik.errors.password
                    ? "text-red-500"
                    : ""
                }
                `}
                >
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : "Mot de passe"}
                </label>
                <div className=" relative">
                  <img
                    src="icons/passwordEye.svg"
                    alt="icon_eye"
                    className=" rounded object-center absolute p-1 right-2 top-3 h-8 w-8"
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    placeholder="Entrer mot de passe"
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={`mt-2 border border-gray-400 rounded-md p-5 h-9 
                    ${
                      formik.touched.password &&
                      formik.errors.password &&
                      "border-red-500"
                    }`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-secondary text-white font-bold mt-5 p-3 rounded-md hover:bg-secondary/80 transition duration-300 ease-in-out"
            >
              S'inscrire
            </button>
          </form>
          <div>
            <div className="flex justify-center mt-3">
              <p className="text-xm">
                Vous avez déja un compte ?
                <span
                  onClick={() => {
                    window.location.href = "/signin";
                  }}
                  className=" ml-3 font-semibold underline text-secondary transition duration-300 ease-in-out w-full cursor-pointer hover:text-secondary/80"
                >
                  Connecter-vous
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

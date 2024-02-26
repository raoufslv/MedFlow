import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../config/axiosConfig.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  // recover the user's information from the localStorage
  var Nom = localStorage.getItem("Nom");
  var Prenom = localStorage.getItem("Prenom");
  var Adressemail = localStorage.getItem("mail");
  var numerotel = localStorage.getItem("PhoneNumber");
  var Specialite = localStorage.getItem("Specialite");
  var utilisateur = localStorage.getItem("Username");
  const token = localStorage.getItem("token");

  // check if one of the information is null? if yes, then retreive the information from the server
  if (
    !Nom ||
    !Prenom ||
    !Adressemail ||
    !numerotel ||
    !Specialite ||
    !utilisateur
  ) {
    console.log("here");
    axiosInstance
      .get("users/profile", { headers: { "x-access-token": token } })
      .then((response) => {
        localStorage.setItem("Nom", response.data.Nom);
        localStorage.setItem("Prenom", response.data.Prenom);
        localStorage.setItem("mail", response.data.mail);
        localStorage.setItem("PhoneNumber", response.data.PhoneNumber);
        localStorage.setItem("Specialite", response.data.Speciality);
        localStorage.setItem("Username", response.data.Username);
      })
      .catch((error) => {
        console.error(error);
      });

    Nom = localStorage.getItem("Nom");
    Prenom = localStorage.getItem("Prenom");
    Adressemail = localStorage.getItem("mail");
    numerotel = localStorage.getItem("PhoneNumber");
    Specialite = localStorage.getItem("Specialite");
    utilisateur = localStorage.getItem("Username");
  }

  const formik = useFormik({
    initialValues: {
      Nom: Nom,
      Prenom: Prenom,
      Adressemail: Adressemail,
      numerotel: numerotel,
      Specialite: Specialite,
      utilisateur: utilisateur,
    },

    // validation of the form
    validationSchema: Yup.object({
      Nom: Yup.string()
        .max(20, "Nom ne doit pas dépasser 20 caractères")
        .required("Nom est requis"),

      Prenom: Yup.string()
        .max(20, "Prenom ne doit pas dépasser 20 caractères")
        .required("Prenom est requis"),

      Adressemail: Yup.string()
        .email("Adresse email invalide")
        .required("Adressemail est requis"),

      numerotel: Yup.string()
        .required("Numéro de téléphone est requis")
        .matches(/^[0-9]+$/, "Numéro de téléphone invalide"),

      Specialite: Yup.string()
        .max(40, "Specialite ne doit pas dépasser 40 caractères")
        .required("Specialite est requis"),

      utilisateur: Yup.string()
        .max(20, "Nom utilisateur ne doit pas dépasser 20 caractères")
        .required("Nom utilisateur est requis"),
    }),

    // Submition of the form

    onSubmit: (values) => {
      axiosInstance
        .put(
          "users/profile",
          {
            Nom: values.Nom,
            Prenom: values.Prenom,
            mail: values.Adressemail,
            PhoneNumber: values.numerotel,
            Speciality: values.Specialite,
            Username: values.utilisateur,
          },
          { headers: { "x-access-token": token } }
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem("Nom", values.Nom);
          localStorage.setItem("Prenom", values.Prenom);
          localStorage.setItem("mail", values.Adressemail);
          localStorage.setItem("PhoneNumber", values.numerotel);
          localStorage.setItem("Specialite", values.Specialite);
          localStorage.setItem("Username", values.utilisateur);

          // show a message to the user that the modification is done successfully
          toast.success("Les modifications sont enregistrées avec succès", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6 p-10 px-20 w-4/5 m-auto"
    >
      <ToastContainer />
      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="Nom"
            className={`${
              formik.touched.Nom && formik.errors.Nom ? "text-red-500" : ""
            }`}
          >
            {formik.touched.Nom && formik.errors.Nom
              ? formik.errors.Nom
              : "Nom"}
          </label>
          <input
            type="text"
            name="Nom"
            placeholder="Nom"
            value={formik.values.Nom}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="Prenom"
            className={`${
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
            name="Prenom"
            placeholder="Prenom"
            value={formik.values.Prenom}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="Adressemail"
          className={`${
            formik.touched.Adressemail && formik.errors.Adressemail
              ? "text-red-500"
              : ""
          }`}
        >
          {formik.touched.Adressemail && formik.errors.Adressemail
            ? formik.errors.Adressemail
            : "Adressemail"}
        </label>
        <input
          type="text"
          name="Adressemail"
          placeholder="Adressemail"
          value={formik.values.Adressemail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className=" border-[1.5px] border-neutral-300 w-full rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="numerotel"
            className={`${
              formik.touched.numerotel && formik.errors.numerotel
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.numerotel && formik.errors.numerotel
              ? formik.errors.numerotel
              : "Numero de telephone"}
          </label>
          <input
            type="text"
            name="numerotel"
            placeholder="numerotel"
            value={formik.values.numerotel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="Specialite"
            className={`${
              formik.touched.Specialite && formik.errors.Specialite
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.Specialite && formik.errors.Specialite
              ? formik.errors.Specialite
              : "Spécialité"}
          </label>
          <input
            type="text"
            name="Specialite"
            placeholder="Specialite"
            value={formik.values.Specialite}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="utilisateur"
          className={`${
            formik.touched.utilisateur && formik.errors.utilisateur
              ? "text-red-500"
              : ""
          }`}
        >
          {formik.touched.utilisateur && formik.errors.utilisateur
            ? formik.errors.utilisateur
            : "Nom d'utilisateur"}
        </label>

        <input
          type="text"
          name="utilisateur"
          placeholder="utilisateur"
          value={formik.values.utilisateur}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className=" border-[1.5px] border-neutral-300 w-full rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
      <div className="flex gap-10 items-center justify-between">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="border-2 border-neutral-300 px-10 py-2 w-fit rounded-xl font-semibold text-lg"
          onClick={() => {
            window.location.href = "/password";
          }}
        >
          Changer le mot de passe
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-secondary px-10 py-2 text-white w-fit rounded-xl font-semibold text-lg"
          type="submit"
        >
          Valider les modifications
        </motion.button>
      </div>
    </form>
  );
};

export default Profile;

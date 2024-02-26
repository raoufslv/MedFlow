import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../config/axiosConfig.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../UI/BackButton.jsx";

const Password = () => {
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      OldPassword: "",
      NewPassword: "",
    },

    // validation of the form
    validationSchema: Yup.object({
      OldPassword: Yup.string().required(
        "Le ancien mot de passe est obligatoire"
      ),

      NewPassword: Yup.string()
        .min(8, "Le neauveau mot de passe doit contenir au moins 8 caractères")
        .required("Le neauveau mot de passe est obligatoire"),
    }),

    // Submition of the form

    onSubmit: (values) => {
      axiosInstance
        .put(
          "users/updatePassword",
          {
            oldPassword: values.OldPassword,
            newPassword: values.NewPassword,
          },
          { headers: { "x-access-token": token } }
        )
        .then((response) => {
          console.log(response);

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
          // if the error is 406, it means that the old password is incorrect
          if (error.response.status === 406) {
            toast.error("Le ancien mot de passe est incorrect", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    },
  });

  return (
    <>
      <ToastContainer />
      <BackButton />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-16  m-auto"
      >
        <div className="flex flex-col gap-10 items-center justify-start">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="OldPassword"
              className={`${
                formik.touched.OldPassword && formik.errors.OldPassword
                  ? "text-red-500"
                  : ""
              }`}
            >
              {formik.touched.OldPassword && formik.errors.OldPassword
                ? formik.errors.OldPassword
                : "Ancien mot de passe"}
            </label>
            <input
              type="text"
              name="OldPassword"
              placeholder="Ancien mot de passe"
              value={formik.values.OldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="NewPassword"
              className={`${
                formik.touched.NewPassword && formik.errors.NewPassword
                  ? "text-red-500"
                  : ""
              }`}
            >
              {formik.touched.NewPassword && formik.errors.NewPassword
                ? formik.errors.NewPassword
                : "Neauveau mot de passe"}
            </label>
            <input
              type="text"
              name="NewPassword"
              placeholder="Neauveau mot de passe"
              value={formik.values.NewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className=" border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>
        <div className="flex gap-10 items-center justify-between">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (window.location.href = "/forgetpassword")}
            className="border-2 border-neutral-300 px-10 py-2 w-fit rounded-xl font-semibold text-lg"
          >
            Mot de passe oublié?
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
    </>
  );
};
export default Password;

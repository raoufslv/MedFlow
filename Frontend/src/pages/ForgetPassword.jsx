import Navbar from "../components/LandingPage/Navbar.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../config/axiosConfig.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const forgetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("users/forgetPassword", values)
        .then((response) => {
          toast.success("Email sent successfully");
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 404) {
            toast.error("Email not found");
          } else {
            toast.error("Server error");
          }
        });
    },
  });

  return (
    <>
      <div className="bg-secondary h-screen">
        <Navbar />
        <ToastContainer />
        <div className="flex justify-center my-32">
          <div className="bg-white p-16 rounded-lg">
            <h1 className="text-3xl font-semibold">Forget Password</h1>
            <form onSubmit={formik.handleSubmit} className="mt-5">
              <label
                htmlFor="email"
                className={`text-sm  ${
                  formik.touched.email && formik.errors.email
                    ? "text-red-500"
                    : ""
                }`}
              >
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : "Email"}
              </label>
              <motion.input
                type="email"
                placeholder="Email"
                className={`border-2  w-full p-2 focus:outline-none  rounded-md
                ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary border-primary"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                id="email"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="bg-primary text-white w-full mt-5 p-2 rounded-md"
              >
                Send Email
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default forgetPassword;

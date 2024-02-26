// ThirdStep.jsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import axiosInstance from "../../../../config/axiosConfig.js";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const ThirdStep = ({ formData, onBack }) => {
  const token = localStorage.getItem("token");
  const [isUpdatePreview, setIsUpdatePreview] = useState(false);
  const sendData = new FormData();

  const formik = useFormik({
    initialValues: {
      visitdate: formData.visitdate || "",
      rendezvous: formData.rendezvous || "",
      bilans: [],
      photos: [],
    },
    validationSchema: Yup.object({
      visitdate: Yup.string().required("Date de Visite est obligatoire"),
      rendezvous: Yup.string().required("Prochain Rendez-vous est obligatoire"),
      bilans: Yup.array().required("Bilan est obligatoire").max(5, "Maximum 5"),
      photos: Yup.array()
        .required("Images est obligatoire")
        .max(5, "Maximum 5"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const combinedData = { ...formData, ...values };

        sendData.append("Nom_p", combinedData.Nom);
        sendData.append("Prenom_p", combinedData.Prenom);
        sendData.append("Date_naissance", combinedData.birthdate);
        sendData.append("Phone", combinedData.numerotel);
        sendData.append("email", combinedData.Adressemail);
        sendData.append("Sexe", combinedData.sexe);
        sendData.append("SituationFamiliale", combinedData.situationfamiliale);
        sendData.append("Antecedants", combinedData.Antecedants);
        sendData.append("MotifConsultation", combinedData.motifconsultaion);
        sendData.append("Medicaments", combinedData.Medicaments);
        sendData.append("CompteRendu", combinedData.compterendu);
        sendData.append("DateVisite", combinedData.visitdate);
        sendData.append("DateProchaineRendezVous", combinedData.rendezvous);

        combinedData.bilans.forEach((bilan) => {
          sendData.append("bilans", bilan);
        });

        combinedData.photos.forEach((photo) => {
          sendData.append("images", photo);
        });

        const response = await axiosInstance.post("/patients/add", sendData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        });

        toast.success(response.data.message);
        // wait for 2 seconds before redirecting to the dashboard
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while submitting the form.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Define the callback to handle file upload status change
  const handleUploadStatusChange = (file, status, formDataKey) => {
    setIsUpdatePreview(!isUpdatePreview);
    if (status === "done") {
      formik.values[formDataKey].push(file.file);
    }

    if (status === "removed") {
      formik.values[formDataKey] = formik.values[formDataKey].filter(
        (item) => item !== file.file
      );
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6 p-10 px-20 w-4/5 m-auto relative"
      encType="multipart/form-data"
    >
      <ToastContainer />
      <img
        src="icons/step3.svg"
        alt="step1 form image"
        className="w-2/5 right-[20rem] absolute top-[-2rem]"
      />
      {/* Render additional form fields for the third step */}
      <div className="flex gap-10 items-center justify-start">
        {/* Date of Visit */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="visitdate"
            className={`${
              formik.touched.visitdate && formik.errors.visitdate
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.visitdate && formik.errors.visitdate
              ? formik.errors.visitdate
              : "Date de Visite"}
          </label>
          <input
            type="date"
            name="visitdate"
            value={formik.values.visitdate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        {/* Next Appointment */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="rendezvous"
            className={`${
              formik.touched.rendezvous && formik.errors.rendezvous
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.rendezvous && formik.errors.rendezvous
              ? formik.errors.rendezvous
              : "Prochain Rendez-vous"}
          </label>
          <input
            type="date"
            name="rendezvous"
            value={formik.values.rendezvous}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      {/* Bilan File Upload */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="bilans"
          className={`${
            formik.touched.bilans && formik.errors.bilans ? "text-red-500" : ""
          }`}
        >
          {formik.touched.bilans && formik.errors.bilans
            ? formik.errors.bilans
            : "Bilan"}
        </label>
        <Dropzone
          inputContent="Drop or click to upload bilans"
          onChangeStatus={(file, status) => {
            handleUploadStatusChange(file, status, "bilans");
          }}
          accept="image/*,text/*,application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          maxFiles={10}
          inputWithFilesContent="Add more"
          styles={{
            dropzone: {
              border: "2px dashed #eaeaea",
              borderRadius: "10px",
              width: "100%",
              minHeight: "100px",
              maxHeight: "200px",
              overflowX: "auto",
              overflowY: "auto",
            },
            inputLabel: {
              color: "#666",
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      {/* Images File Upload */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="photos"
          className={`${
            formik.touched.photos && formik.errors.photos ? "text-red-500" : ""
          }`}
        >
          {formik.touched.photos && formik.errors.photos
            ? formik.errors.photos
            : "Images"}
        </label>
        <Dropzone
          inputContent="Drop or click to upload images"
          onChangeStatus={(file, status) => {
            handleUploadStatusChange(file, status, "photos");
          }}
          accept="image/*"
          maxFiles={10}
          inputWithFilesContent="Add more"
          styles={{
            dropzone: {
              border: "2px dashed #eaeaea",
              borderRadius: "10px",
              width: "100%",
              minHeight: "100px",
              maxHeight: "200px",
              overflowX: "auto",
              overflowY: "auto",
            },
            inputLabel: {
              color: "#666",
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      {/* Back button */}
      <div className="flex gap-10 items-center justify-between">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="border-2 border-neutral-300 px-10 py-2 w-fit rounded-xl font-semibold text-lg"
          onClick={() => {
            // manually updating the formData with the current value of the fields
            formData.visitdate = formik.values.visitdate;
            formData.rendezvous = formik.values.rendezvous;
            onBack();
          }}
        >
          Previous
        </motion.button>
        {/* Submit button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-secondary px-10 py-2 text-white w-fit rounded-xl font-semibold text-lg"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </motion.button>
      </div>
    </form>
  );
};

export default ThirdStep;

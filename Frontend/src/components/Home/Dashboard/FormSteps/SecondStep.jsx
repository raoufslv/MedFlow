import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const FirstStep = ({ formData, onNext, onBack }) => {
  const formik = useFormik({
    initialValues: {
      Antecedants: formData.Antecedants || "",
      Medicaments: formData.Medicaments || "",
      compterendu: formData.compterendu || "",
      motifconsultaion: formData.motifconsultaion || "",
    },

    validationSchema: Yup.object({
      Antecedants: Yup.string().required("Antecedants est obligatoire"),
      Medicaments: Yup.string().required("Medicaments est obligatoire"),
      compterendu: Yup.string().required("compterendu est obligatoire"),
      motifconsultaion: Yup.string().required(
        "motifconsultaion est obligatoire"
      ),
    }),
    onSubmit: (values) => {
      onNext(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6 p-10 px-20 w-4/5 m-auto relative"
    >
      <img
        src="icons/step2.svg"
        alt="step1 form image"
        className="w-2/5 right-[20rem] absolute top-[-2rem]"
      />
      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="Antecedants"
            className={`${
              formik.touched.Antecedants && formik.errors.Antecedants
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.Antecedants && formik.errors.Antecedants
              ? formik.errors.Antecedants
              : "Antécédants "}
          </label>
          <input
            type="text"
            name="Antecedants"
            placeholder="Antecedants"
            value={formik.values.Antecedants}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="motifconsultaion"
            className={`${
              formik.touched.motifconsultaion && formik.errors.motifconsultaion
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.motifconsultaion && formik.errors.motifconsultaion
              ? formik.errors.motifconsultaion
              : "Motif de Consultation"}
          </label>
          <input
            type="text"
            name="motifconsultaion"
            placeholder="motifconsultaion"
            value={formik.values.motifconsultaion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="Medicaments"
          className={`${
            formik.touched.Medicaments && formik.errors.Medicaments
              ? "text-red-500"
              : ""
          }`}
        >
          {formik.touched.Medicaments && formik.errors.Medicaments
            ? formik.errors.Medicaments
            : "Médicaments"}
        </label>
        <input
          type="text"
          name="Medicaments"
          placeholder="Medicaments"
          value={formik.values.Medicaments}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className=" border-[1.5px] border-neutral-300 w-full rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="compterendu"
          className={`${
            formik.touched.compterendu && formik.errors.compterendu
              ? "text-red-500"
              : ""
          }`}
        >
          {formik.touched.compterendu && formik.errors.compterendu
            ? formik.errors.compterendu
            : "Compte rendu"}
        </label>
        <textarea
          type="text"
          name="compterendu"
          placeholder="vuillez entrer le compte rendu"
          value={formik.values.compterendu}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className=" border-[1.5px] border-neutral-300 w-full rounded-md p-3 h-32 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="flex gap-10 items-center justify-between">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="border-2 border-neutral-300 px-10 py-2 w-fit rounded-xl font-semibold text-lg"
          onClick={() => {
            // manually updating the formData with the current value of the fields
            formData.Antecedants = formik.values.Antecedants;
            formData.Medicaments = formik.values.Medicaments;
            formData.compterendu = formik.values.compterendu;
            formData.motifconsultaion = formik.values.motifconsultaion;
            onBack(1);
          }}
        >
          Precédent
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-secondary px-10 py-2 text-white w-fit rounded-xl font-semibold text-lg"
          type="submit"
        >
          Suivant
        </motion.button>
      </div>
    </form>
  );
};

export default FirstStep;

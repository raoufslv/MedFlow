import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const FirstStep = ({ formData, onNext }) => {
  const formik = useFormik({
    initialValues: {
      Nom: formData.Nom || "",
      Prenom: formData.Prenom || "",
      Adressemail: formData.Adressemail || "",
      numerotel: formData.numerotel || "",
      sexe: formData.sexe || "",
      birthdate: formData.birthdate || "",
      situationfamiliale: formData.situationfamiliale || "",
    },

    validationSchema: Yup.object({
      Nom: Yup.string().required("Nom est obligatoire"),
      Prenom: Yup.string().required("Prenom est obligatoire"),
      Adressemail: Yup.string()
        .email("Adressemail est obligatoire")
        .required("Adressemail est obligatoire"),
      numerotel: Yup.string()
        .required("numerotel est obligatoire")
        .matches(/^[0-9]+$/, "numerotel doit être un nombre"),
      sexe: Yup.string().required("sexe est obligatoire"),
      birthdate: Yup.string().required("birthdate est obligatoire"),
      situationfamiliale: Yup.string().required(
        "situationfamiliale est obligatoire"
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
        src="icons/step1.svg"
        alt="step1 form image"
        className="w-2/5 right-[20rem] absolute top-[-2rem]"
      />
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
            htmlFor="sexe"
            className={`${
              formik.touched.sexe && formik.errors.sexe ? "text-red-500" : ""
            }`}
          >
            {formik.touched.sexe && formik.errors.sexe
              ? formik.errors.sexe
              : "Sexe"}
          </label>
          <select
            name="sexe"
            value={formik.values.sexe}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-secondary h-12 p-3"
          >
            <option value="" label="Sexe" hidden />
            <option value="Homme" label="Homme" />
            <option value="Femme" label="Femme" />
          </select>
        </div>
      </div>

      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="birthdate"
            className={`${
              formik.touched.birthdate && formik.errors.birthdate
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.birthdate && formik.errors.birthdate
              ? formik.errors.birthdate
              : "Date de Naissance"}
          </label>
          <input
            type="date"
            name="birthdate"
            value={formik.values.birthdate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="situationfamiliale"
            className={`${
              formik.touched.situationfamiliale &&
              formik.errors.situationfamiliale
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.situationfamiliale &&
            formik.errors.situationfamiliale
              ? formik.errors.situationfamiliale
              : "Situation familiale"}
          </label>
          <select
            type="text"
            name="situationfamiliale"
            value={formik.values.situationfamiliale}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md  h-12 p-3 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="" label="Situation familiale" hidden />
            <option value="Célibataire">Célibataire</option>
            <option value="Marié">Marié</option>
            <option value="Divorcé">Divorcé</option>
          </select>
        </div>
      </div>

      <div className="flex gap-10 items-center justify-end">
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

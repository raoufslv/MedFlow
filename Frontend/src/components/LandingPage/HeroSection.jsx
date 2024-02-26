import { motion } from "framer-motion";
const HeroSection = () => {
  return (
    <div className="flex gap-14 mx-24 mt-16 mb-0 items-center justify-center">
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-6xl">
          Coordination entre les médecins et les patients
        </h1>
        <p className=" w-4/6 font-medium">
          Notre plateforme est dédiée à Simplifier la gestion des patients, en
          offrant une organisation des dossiers médicaux et une planification
          intuitive des rendez-vous.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => (window.location.href = "/signup")}
          className="bg-secondary px-10 py-4 text-white w-fit rounded-md font-semibold text-2xl"
        >
          Commencer
        </motion.button>
      </div>
      <div className="">
        <img
          src="images/hero.svg"
          className="w-[60rem] object-contain"
          alt="hero section svg"
        />
      </div>
    </div>
  );
};

export default HeroSection;

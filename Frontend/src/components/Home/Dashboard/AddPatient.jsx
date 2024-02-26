import BackButton from "../UI/BackButton";
import "react-toastify/dist/ReactToastify.css";
import FirstStep from "./FormSteps/FirstStep.jsx";
import SecondStep from "./FormSteps/SecondStep.jsx";
import ThirdStep from "./FormSteps/ThirdStep.jsx";
import { useState } from "react";

const AddPatient = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <BackButton />

      {step === 1 && <FirstStep formData={formData} onNext={handleNext} />}
      {step === 2 && (
        <SecondStep
          formData={formData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && <ThirdStep formData={formData} onBack={handleBack} />}
    </>
  );
};

export default AddPatient;

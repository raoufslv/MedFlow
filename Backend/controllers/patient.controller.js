import db from "../Models/index.js";
const Patient = db.patient;

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ medecinId: req.userId });
    if (!patients) res.status(404).send(" no patients found");
    res.send(patients);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addPatient = async (req, res) => {
  try {
    let photos = [];
    let bilans = [];

    if (req.files) {
      if (req.files.images) {
        photos = req.files.images;
      }
      if (req.files.bilans) {
        bilans = req.files.bilans;
      }
    }

    const patient = new Patient({
      medecinId: req.userId,
      Nom_p: req.body.Nom_p,
      Prenom_p: req.body.Prenom_p,
      Date_naissance: req.body.Date_naissance,
      Phone: req.body.Phone,
      Sexe: req.body.Sexe,
      email: req.body.email,
      SituationFamiliale: req.body.SituationFamiliale,
      Antecedants: req.body.Antecedants,
      MotifConsultation: req.body.MotifConsultation,
      Medicaments: req.body.Medicaments,
      CompteRendu: req.body.CompteRendu,
      DateVisite: req.body.DateVisite,
      DateProchaineRendezVous: req.body.DateProchaineRendezVous,
      images: photos.map((photo) => photo.path),
      bilans: bilans.map((bilan) => bilan.path),
    });
    await patient.save(patient);
    res.send({ message: "Patient was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) res.status(404).send("patient not found");
    res.send(patient);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) res.status(404).send("patient not found");
    patient.Nom_p = req.body.Nom_p;
    patient.Prenom_p = req.body.Prenom_p;
    patient.Date_naissance = req.body.Date_naissance;
    patient.Phone = req.body.Phone;
    patient.Sexe = req.body.Sexe;
    patient.SituationFamiliale = req.body.SituationFamiliale;
    patient.Antecedants = req.body.Antecedants;
    await patient.save(patient);
    res.send({ message: "Patient was updated successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) res.status(404).send("patient not found");
    await Patient.deleteOne(patient);
    res.send({ message: "Patient was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

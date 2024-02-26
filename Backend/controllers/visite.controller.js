import db from "../Models/index.js";

const Visite = db.visite;
const Patient = db.patient;
// const User = db.user;

export const getVisites = async (req, res) => {
  try {
    const visites = await Visite.find();
    if (!visites) res.status(404).send(" no visites found");
    res.send(visites);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addVisite = async (req, res) => {
  const patient = await Patient.findById(req.params.idP);
  if (patient) {
    const NumVisits = await getNumVists(patient._id);

    const visite = new Visite({
      patientId: patient._id,
      Numero_visite: NumVisits + 1,
      Date_visite: req.body.Date_visite,
      Motif_Consultation: req.body.Motif_Consultation,

      // Examen: req.body.Examen,
      // Diagnostic: req.body.Diagnostic,
      // Traitement: req.body.Traitement,
      // Prix: req.body.Prix,
    });
    visite
      .save(visite)
      .then((data) => {
        res.send({ message: "User was registered successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(404).send("patient not found");
  }
};

const getNumVists = async (patientId) => {
  try {
    const numvisite = await Visite.find({
      patientId: patientId,
    }).countDocuments();

    return numvisite;
  } catch (err) {
    return 0;
  }
};

export const getVisiteById = async (req, res) => {
  try {
    const visite = await Visite.findById(req.params.idV);
    if (!visite) res.status(404).send("visite not found");
    res.send(visite);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteVisite = async (req, res) => {
  try {
    const visite = await Visite.findById(req.params.idV);
    if (!visite) res.status(404).send("visite not found");
    await Visite.deleteOne(visite);
    res.send({ message: "Visite was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateVisite = async (req, res) => {
  try {
    const visite = await Visite.findById(req.params.idV);
    if (!visite) res.status(404).send(" visite not found");
    visite.Numero_visite = req.body.Numero_visite;
    visite.Date_visite = req.body.Date_visite;
    visite.Motif_Consultation = req.body.Motif_Consultation;

    // visite.Examen = req.body.Examen;
    // visite.Diagnostic = req.body.Diagnostic;
    // visite.Traitement = req.body.Traitement;
    // visite.Prix = req.body.Prix;

    await visite.save();
    res.send({ message: "Visite was updated successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

import db from "../Models/index.js";

const Patient = db.patient;
const RendezVous = db.RendezVous;

export const getAllrendez = async (req, res) => {
  try {
    const rendezvous = await RendezVous.find();

    if (!rendezvous) {
      res.status(404).send(" No rendez vous found");
      return;
    }
    res.send(rendezvous);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addRendezVous = async (req, res) => {
  const patient = await Patient.findById(req.params.idP);

  if (patient) {
    const rendez_vous = new RendezVous({
      medecin_Id: req.userId,
      patient_Id: patient._id,
      heureRendezVous: req.body.heureRendezVous,
      DateRendezVous: req.body.DateRendezVous,
    });
    rendez_vous
      .save(rendez_vous)
      .then((data) => {
        res.send({ message: " Rendez vous  was registered successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(404).send("patient not found");
  }
};

export const getRendezVousById = async (req, res) => {
  try {
    const rendez_vous = await RendezVous.findById(req.params.idR);
    if (!rendez_vous) {
      res.status(404).send("Rendez Vous not found");
      return;
    }
    res.send(rendez_vous);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteRendezVous = async (req, res) => {
  try {
    const rendez_vous = await RendezVous.findById(req.params.idR);
    if (!rendez_vous) {
      res.status(404).send("Rendez Vous not found");
      return;
    }
    await RendezVous.deleteOne(rendez_vous);
    res.send({ message: "Rendez Vous was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updaterendezVous = async (req, res) => {
  try {
    const rendez_vous = await RendezVous.findById(req.params.idR);

    if (!rendez_vous) {
      res.status(404).send("Rendez Vous not found");
      return;
    }

    rendez_vous.heureRendezVous = req.body.heureRendezVous;
    rendez_vous.DateRendezVous = req.body.DateRendezVous;

    await rendez_vous.save();
    res.send({ message: "Rendez Vous was updated successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

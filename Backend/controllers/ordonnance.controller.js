import db from "../Models/index.js";

const Ordonnance = db.ordonnance;
const Visite = db.visite;

export const getOrdonnances = async (req, res) => {
  try {
    const ordonnances = await Ordonnance.find({
      Visite_Id: req.params.idV,
    });
    if (!ordonnances) res.status(404).send(" no ordonnances found");
    res.send(ordonnances);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addOrdonnance = async (req, res) => {
  const visite = await Visite.findById(req.params.idV);
  if (visite) {
    const ordonnance = new Ordonnance({
      Visite_Id: visite._id,
      Medicaments: req.body.Medicaments,
    });
    ordonnance
      .save(ordonnance)
      .then((data) => {
        res.send({ message: "ordonnance was added successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(404).send("visite not found");
  }
};

export const getOrdonnanceById = async (req, res) => {
  try {
    const ordonnance = await Ordonnance.findById(req.params.idO);
    if (!ordonnance) res.status(404).send(" no ordonnance found");
    res.send(ordonnance);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateOrdonnance = async (req, res) => {
  try {
    const ordonnance = await Ordonnance.findByIdAndUpdate(
      req.params.idO,
      req.body,
      { useFindAndModify: false }
    );
    if (!ordonnance) res.status(404).send(" no ordonnance found");
    res.send({ message: "ordonnance was updated successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteOrdonnance = async (req, res) => {
  try {
    const ordonnance = await Ordonnance.findByIdAndDelete(req.params.idO);
    if (!ordonnance) res.status(404).send(" no ordonnance found");
    res.send({ message: "ordonnance was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

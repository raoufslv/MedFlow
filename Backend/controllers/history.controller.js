import db from "../Models/index.js";

const Historique = db.historique;

export const getAllHistory = async (req, res) => {
  try {
    const historique = await Historique.find();

    if (!historique) {
      res.status(404).send(" No historique found");
      return;
    }
    res.send(historique);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

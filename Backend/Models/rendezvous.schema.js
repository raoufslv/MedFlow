import mongoose from "mongoose";

// Schéma pour les créneaux horaires disponibles

const RendezVous = mongoose.model(
  "Listerendezvous",
  new mongoose.Schema({
    medecin_Id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patient_Id: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    heureRendezVous: {
      type: String,
      required: true,
    },
    DateRendezVous: {
      type: String,
      required: true,
    },
  })
);

export default RendezVous;

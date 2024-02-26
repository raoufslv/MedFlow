import mongoose from "mongoose";

const Ordonnance = mongoose.model(
  "Ordonnance",
  new mongoose.Schema({
    Visite_Id: {
      type: mongoose.Types.ObjectId,
      ref: "Visite",
      required: true,
    },
    Date_ord: {
      type: Date,
      default: Date.now,
    },

    Medicaments: [
      {
        name: {
          type: String,
        },
        dosage: {
          type: String,
        },
        duree: {
          type: String,
        },
      },
    ],
  })
);

const Visite = mongoose.model(
  "visites",
  new mongoose.Schema({
    patientId: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    Numero_visite: {
      type: Number,
    },
    Date_visite: {
      type: Date,
      required: true,
      default: Date.now,
    },
    Motif_Consultation: {
      type: String,
    },
    compte_rendu: {
      type: String,
    },
    Liste_images: [
      {
        type: String,
      },
    ],
    rapport_generee: {
      type: String,
    },
  })
);

export { Visite, Ordonnance };

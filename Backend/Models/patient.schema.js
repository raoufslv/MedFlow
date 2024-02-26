import mongoose from "mongoose";

const Patient = mongoose.model(
  "patient",
  new mongoose.Schema({
    medecinId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Nom_p: { type: String, required: true },
    Prenom_p: {
      type: String,
      required: true,
    },
    Date_naissance: {
      type: Date,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    Sexe: {
      type: String,
      enum: ["Femme", "Homme"],
      required: true,
    },
    ListeVisite: [
      { type: mongoose.Types.ObjectId, ref: "Visite", default: [] },
    ],
    SituationFamiliale: {
      type: String,
      enum: ["Célibataire", "Marié", "Divorcé", "Veuf"],
    },
    Antecedants: {
      type: String,
    },
    MotifConsultation: {
      type: String,
    },
    Medicaments: {
      type: String,
    },
    CompteRendu: {
      type: String,
    },
    DateVisite: {
      type: Date,
    },
    DateProchaineRendezVous: {
      type: Date,
    },
    // list of images
    images: [
      {
        type: String,
      },
    ],
    // list of bilans
    bilans: [
      {
        type: String,
      },
    ],
  })
);
export default Patient;

import mongoose from "mongoose";

const Notification = mongoose.model(
  "Notification",
  new mongoose.Schema({
    medecinId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    rendezVousId: {
      type: mongoose.Types.ObjectId,
      ref: "RendezVous",
    },
    NomPatient: {
      type: String,
      required: true,
    },
    prenomPatient: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    vu: {
      type: Boolean,
      default: false,
    },
  })
);
export default Notification;

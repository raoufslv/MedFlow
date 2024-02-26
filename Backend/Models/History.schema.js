import mongoose from "mongoose";

// Define the enum for resource types
const ActionTypes = {
  TYPE1: "Create",
  TYPE2: "Update",
  TYPE3: "Delete",
  TYPE4: "Read",
};

const HistoriqueAction = mongoose.model(
  "historiqueActions",
  new mongoose.Schema({
    RessourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    RessourceName: {
      type: String,
      required: true,
    },

    actionType: {
      type: String,
      enum: Object.values(ActionTypes),
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
  })
);

export default HistoriqueAction;

import express from "express";
import connectDb from "./config/dbConnection.js";
import dotenv from "dotenv";
import responseHandler from "./middleware/addToHistory.js";
import { verifyTokenForHistory } from "./middleware/authJwt.js";
import cors from "cors";
dotenv.config();
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors());
app.use(express.json({ extended: false }));
// app.use(express.json()); // parse requests of content-type - application/json
// app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded, 

// Apply the responseHandler middleware globally
// app.use(verifyTokenForHistory, responseHandler);

const port = process.env.PORT || 5000; // set port number


connectDb();

import userRouter from "./routes/user.routes.js";
app.use("/users", userRouter);

import patientRouter from "./routes/patient.routes.js";
app.use("/patients", patientRouter);

import visiteRouter from "./routes/visite.routes.js";
app.use("/visites/", visiteRouter);

import RendezVousRouter from "./routes/rendezvous.routes.js";
app.use("/rendezvous", RendezVousRouter);

import ordonnanceRouter from "./routes/ordannance.routes.js";
app.use("/ordonnances/", ordonnanceRouter);

import notificationRouter from "./routes/notification.routes.js";
app.use("/notifications/", notificationRouter);

import detectionRouter from "./routes/detection.routes.js";
app.use("/detection/", detectionRouter);

import historyRouter from "./routes/history.routes.js";
app.use("/history/", historyRouter);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Marhaba..." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); // start the server
